import { Stack, Table, Text, Title } from "@mantine/core";
import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { z } from "zod";
import { requireAuth } from "~/services/auth.server";
import { prisma } from "~/services/prisma.server";

const paramSchema = z.object({
  loan: z.string(),
  scenario: z.string(),
});

export async function loader({ params, request }: LoaderArgs) {
  const { id: userId } = await requireAuth(request);
  const { loan: loanId, scenario: scenarioId } = paramSchema.parse(params);
  const [, scenario] = await Promise.all([
    fetchLoan(loanId, userId),
    fetchScenario(scenarioId, loanId),
  ]);
  return json({
    scenario,
  });
}

export default function Scenario() {
  const { scenario } = useLoaderData<typeof loader>();
  return (
    <Form>
      <Stack>
        <Title order={1}>{scenario.name}</Title>
        <Table>
          <thead>
            <tr>
              <Text component="th">Additional Principal</Text>
              <Text component="th">From</Text>
              <Text component="th">To</Text>
            </tr>
          </thead>
          <tbody>
            {scenario.payments.map((payment) => (
              <tr key={payment.id}>
                <Text component="td">
                  {usd.format(payment.principalAmount)}
                </Text>
                <Text component="td">
                  {month.format(new Date(payment.from))}
                </Text>
                <Text component="td">
                  {payment.to ? month.format(new Date(payment.to)) : null}
                </Text>
              </tr>
            ))}
          </tbody>
        </Table>
      </Stack>
    </Form>
  );
}

const usd = new Intl.NumberFormat("en-US", {
  currency: "usd",
  style: "currency",
});

const month = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
});

async function fetchLoan(id: string, userId: string) {
  const loan = await prisma.loan.findUnique({
    where: { id },
    select: { userId: true },
  });
  if (!loan || loan.userId !== userId) {
    throw new Response(null, { status: 404 });
  }
  return loan;
}

async function fetchScenario(id: string, loanId: string) {
  const scenario = await prisma.scenario.findUnique({
    where: { id },
    select: {
      loanId: true,
      name: true,
      payments: {
        select: {
          from: true,
          id: true,
          principalAmount: true,
          to: true,
        },
      },
    },
  });
  if (!scenario || scenario.loanId !== loanId) {
    throw new Response(null, { status: 404 });
  }
  return scenario;
}
