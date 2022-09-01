import { createCookieSessionStorage } from "@remix-run/node";
import { Authenticator } from "remix-auth";
import { Auth0Strategy } from "remix-auth-auth0";

const REDIRECT_PARAM = "redirectUrl";

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "_session", // use any name you want here
    sameSite: "lax", // this helps with CSRF
    path: "/", // remember to add this so the cookie will work in all routes
    httpOnly: true, // for security reasons, make this cookie http only
    secrets: ["s3cr3t"], // replace this with an actual secret
    secure: process.env.NODE_ENV === "production", // enable this in prod only
  },
});

export interface User {
  readonly displayName: string;
  readonly email: string;
  readonly id: string;
}

export const authenticator = new Authenticator<User>(sessionStorage);
authenticator.use(
  new Auth0Strategy(
    {
      callbackURL: "http://localhost:3000/auth0/callback",
      clientID: "p8JfcmcCYe9gWI1QdWWEZbcmNbENdYAG",
      clientSecret:
        "TBUQneJOw6XcSGWlPIXkNq51tdhfcjGMYml2yw28vnW9FCue_f44k_al8bVMVrZE",
      domain: "abundantia-dev.us.auth0.com",
    },
    async ({ profile }) => {
      return {
        displayName: profile.displayName,
        email: profile.emails[0].value,
        id: profile.id,
      };
    }
  )
);

export async function login(request: Request): Promise<User> {
  return authenticator.authenticate("auth0", request, {
    get failureRedirect() {
      const url = new URL(request.url);
      const params = new URLSearchParams();
      params.append(REDIRECT_PARAM, `${url.pathname}${url.search}`);
      return `/login?${params}`;
    },
    get successRedirect() {
      const url = new URL(request.url);
      const redirectUrl = url.searchParams.get(REDIRECT_PARAM) || "/";
      return redirectUrl;
    },
  });
}

export async function logout(request: Request): Promise<void> {
  await authenticator.logout(request, {
    redirectTo: "/login",
  });
}

export async function requireAuth(request: Request): Promise<User> {
  return await authenticator.isAuthenticated(request, {
    get failureRedirect() {
      const url = new URL(request.url);
      const params = new URLSearchParams();
      params.append(REDIRECT_PARAM, `${url.pathname}${url.search}`);
      return `/login?${params}`;
    },
  });
}

export async function requireAnonymous(request: Request): Promise<void> {
  await authenticator.isAuthenticated(request, {
    get successRedirect() {
      const url = new URL(request.url);
      const redirectUrl = url.searchParams.get(REDIRECT_PARAM) || "/";
      return redirectUrl;
    },
  });
}
