import { Container, Divider, Grid, NavLink } from "@mantine/core";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, Outlet, useLoaderData } from "@remix-run/react";
import { IconPlus } from "@tabler/icons";
import { z } from "zod";
import { requireAuth } from "~/services/auth.server";
import { prisma } from "~/services/prisma.server";

const paramSchema = z.object({ loan: z.string() });

export async function action({ params, request }: ActionArgs) {
  const { id: userId } = await requireAuth(request);
  const { loan: id } = paramSchema.parse(params);
  const loan = await prisma.loan.findUnique({
    where: { id },
    select: {
      _count: {
        select: {
          scenarios: true,
        },
      },
      userId: true,
    },
  });
  if (!loan || loan.userId !== userId) {
    throw new Response(null, { status: 404 });
  }

  const scenario = await prisma.scenario.create({
    data: {
      name: `Scenario ${loan._count.scenarios + 1}`,
      loanId: id,
    },
    select: { id: true },
  });
  return redirect(`/loans/${id}/explore/scenarios/${scenario.id}`);
}

export async function loader({ params, request }: LoaderArgs) {
  const { id: userId } = await requireAuth(request);
  const { loan: id } = paramSchema.parse(params);
  const loan = await prisma.loan.findUnique({
    where: { id },
    select: { userId: true },
  });
  if (!loan || loan.userId !== userId) {
    throw new Response(null, { status: 404 });
  }

  const scenarios = await prisma.scenario.findMany({
    where: { loanId: id },
    select: {
      id: true,
      name: true,
    },
  });

  return json({
    scenarios,
  });
}

export default function LoanExploreShell() {
  const { scenarios } = useLoaderData<typeof loader>();
  return (
    <Container size="xl">
      <Grid>
        <Grid.Col md={3}>
          {scenarios.map((scenario) => (
            <NavLink
              component={Link}
              key={scenario.id}
              label={scenario.name}
              to={`scenarios/${scenario.id}`}
            />
          ))}
          {scenarios.length > 0 && <Divider my="sm" />}
          <Form method="post">
            <NavLink
              component="button"
              icon={<IconPlus />}
              label="Add a Scenario"
              type="submit"
            />
          </Form>
        </Grid.Col>
        <Grid.Col md={9}>
          <Outlet />
        </Grid.Col>
      </Grid>
    </Container>
  );
}
