const { OAuth2Client } = require("google-auth-library");
const express = require("express");
const fs = require("fs");
const GraphQLClient = require("graphql-request").GraphQLClient;
const jwt = require("jsonwebtoken");
const path = require("path");
const request = require("request");
const static = require("serve-static");

const PORT = process.env.PORT || 1234;
const PRISMA_SECRET = process.env.PRISMA_SECRET;
const PRISMA_URL = process.env.PRISMA_URL;
const STAGE = process.env.STAGE;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

const googleOauthClient = new OAuth2Client(GOOGLE_CLIENT_ID);

const app = express();
app.use(require("cors")());
app.use(require("cookie-parser")());
app.use(require("express-session")({ secret: "oofcity", resave: true, saveUninitialized: true }));

app.use(async function(req, res, next) {
  const authorizeHeader = req.header("Authorize");
  if (authorizeHeader) {
    const idToken = authorizeHeader.replace("Bearer ", "");
    try {
      const value = await googleOauthClient.verifyIdToken({
        audience: GOOGLE_CLIENT_ID,
        idToken: idToken,
      });
      req.user = value.getPayload();
      req.tenant = req.user.email.replace(/[^a-zA-Z0-9]/g, "_");
    } catch (err) {
      console.error(err);
    } finally {
      next();
    }
  } else {
    next();
  }
});

// Create the database if it doesn't exist
app.use(async function(req, res, next) {
  if (!req.user) {
    next();
    return;
  }

  const authToken = jwt.sign(
    {
      grants: [
        {
          target: `${req.tenant}/${STAGE}`,
          action: "*",
        },
      ],
    },
    PRISMA_SECRET,
    {
      expiresIn: 60,
    },
  );
  const prismaManagementClient = new GraphQLClient(`${PRISMA_URL}/management`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  const datamodel = fs.readFileSync(path.join(__dirname, "datamodel.prisma")).toString();
  let data;
  try {
    data = await prismaManagementClient.request(
      `
  query ProjectStatus($name: String!, $stage: String!) {
    migrationStatus(name: $name, stage: $stage) {
      status
    }
    project(name: $name, stage: $stage) {
      datamodel
    }
  }
    `,
      {
        name: req.tenant,
        stage: STAGE,
      },
    );
  } catch (err) {
    console.error(err);
  }
  if (!data || !data.project) {
    await prismaManagementClient.request(
      `
mutation CreateProject($name: String!, $stage: String!, $types: String!) {
  addProject(input: { name: $name, stage: $stage }) {
    project {
      name
    }
  }
  deploy(input:{name: $name, stage: $stage, types: $types}) {
    clientMutationId
  }
}
    `,
      {
        name: req.tenant,
        stage: STAGE,
        types: datamodel,
      },
    );
  } else if (data.project.datamodel !== datamodel) {
    await prismaManagementClient.request(
      `
mutation DeployProject($name: String!, $stage: String!, $types: String!) {
  deploy(input:{name: $name, stage: $stage, types: $types}) {
    clientMutationId
  }
}
    `,
      {
        name: req.tenant,
        stage: STAGE,
        types: datamodel,
      },
    );
  }
  while (!data || data.migrationStatus.status !== "SUCCESS") {
    await new Promise(resolve => {
      setTimeout(() => resolve(), 50);
    });
    data = await prismaManagementClient.request(
      `
  query ProjectStatus($name: String!, $stage: String!) {
    migrationStatus(name: $name, stage: $stage) {
      status
    }
    project(name: $name, stage: $stage) {
      datamodel
    }
  }
    `,
      {
        name: req.tenant,
        stage: STAGE,
      },
    );
  }
  next();
});

app.all(/api.*/, function(req, res) {
  if (!req.user) {
    res.status(401).end();
  } else {
    req.pipe(request(`${PRISMA_URL}/${req.tenant}/${STAGE}`)).pipe(res);
  }
});

if (process.env.NODE_ENV === "production") {
  app.all("*", static(path.join(__dirname, "../client/dist")));
} else {
  const Bundler = require("parcel-bundler");
  const bundler = new Bundler(path.join(__dirname, "../client/src/index.html"));
  bundler.on("buildStart", () => {
    console.log("⚛  Parcel build started");
  });
  app.use(bundler.middleware());
}

app.listen(PORT);
console.log(`Server listening on port ${PORT}`);