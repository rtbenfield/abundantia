import { Alert, Button, Container, Group, Stack, Title } from "@mantine/core";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, useLoaderData, useTransition } from "@remix-run/react";
import { z } from "zod";
import { requireAuth } from "~/services/auth.server";
import { prisma } from "~/services/prisma.server";

const paramSchema = z.object({ loan: z.string() });

export async function action({ params, request }: ActionArgs) {
  const { id: userId } = await requireAuth(request);
  const { loan: id } = paramSchema.parse(params);
  console.debug(`retrieving loan ${id} for user ${userId}`, {
    id,
    userId,
  });
  const loan = await prisma.loan.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      userId: true,
    },
  });
  if (!loan || loan.userId !== userId) {
    throw new Response(null, { status: 404 });
  }
  await prisma.loan.delete({
    where: { id },
  });
  console.info(`deleted loan ${id} for user ${userId}`, { id, userId });
  return redirect("/");
}

export async function loader({ params, request }: LoaderArgs) {
  const { id: userId } = await requireAuth(request);
  const { loan: id } = paramSchema.parse(params);
  console.debug(`retrieving loan ${id} for user ${userId}`, {
    loanId: id,
    userId,
  });
  const loan = await prisma.loan.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      userId: true,
    },
  });
  if (!loan || loan.userId !== userId) {
    throw new Response(null, { status: 404 });
  }
  return json({ loan });
}

export default function LoanDelete() {
  const { state } = useTransition();
  const { loan } = useLoaderData<typeof loader>();
  return (
    <Container size="xs">
      <Form method="delete">
        <Stack>
          <Title order={1}>Delete {loan.name}?</Title>
          <Alert color="red">{`Are you sure you want to delete ${loan.name}? This action cannot be undone.`}</Alert>
          <Group position="apart">
            <Button
              component={Link}
              size="lg"
              to={`/loans/${loan.id}`}
              variant="subtle"
            >
              Cancel
            </Button>
            <Button
              color="red"
              disabled={state !== "idle"}
              size="lg"
              type="submit"
            >
              Delete
            </Button>
          </Group>
        </Stack>
      </Form>
    </Container>
  );
}
