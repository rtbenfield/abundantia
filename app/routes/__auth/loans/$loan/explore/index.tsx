import { Box, Paper, SimpleGrid, Title } from "@mantine/core";
import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { ParentSize } from "@visx/responsive";
import { extent } from "d3-array";
import type { ReactNode } from "react";
import { useMemo } from "react";
import { z } from "zod";
import type { ScenarioSeries } from "~/components/ComparisonChart";
import { ComparisonChart } from "~/components/ComparisonChart";
import { useColorWheel } from "~/hooks/useColorWheel";
import type { AmortizationPayment } from "~/services/amortization";
import { makeAmortizationSchedule } from "~/services/amortization";
import { requireAuth } from "~/services/auth.server";
import { prisma } from "~/services/prisma.server";

const paramSchema = z.object({ loan: z.string() });

export async function loader({ params, request }: LoaderArgs) {
  const { id: userId } = await requireAuth(request);
  const { loan: id } = paramSchema.parse(params);
  const [loan, scenarios] = await Promise.all([
    fetchLoan(id, userId),
    fetchScenarios(id),
  ]);

  const baseScenario = makeAmortizationSchedule(loan);
  const projections = scenarios.map(({ payments, ...scenario }) => {
    return {
      payments: makeAmortizationSchedule(loan, {
        additionalPayments: payments,
      }).filter((x) => x.balance > 0),
      scenario,
    };
  });

  return json({
    baseScenario,
    domain: extent(baseScenario, (x) => x.date),
    scenarios: [
      {
        payments: makeAmortizationSchedule(loan),
        scenario: {
          id: "base",
          name: "Base",
          payments: [],
        },
      },
      ...projections,
    ],
  });
}

export default function LoanExploreOverview() {
  const { domain, scenarios } = useLoaderData<typeof loader>();
  const colors = useColorWheel();
  const d = useMemo<[Date, Date]>(() => {
    return [new Date(domain[0] ?? 0), new Date(domain[1] ?? 0)];
  }, [domain]);
  const scen = useMemo<ReadonlyArray<ScenarioSeries>>(() => {
    return scenarios.map((x) => {
      return {
        color: colors.next().value,
        payments: x.payments.map((p) => {
          return { ...p, date: new Date(p.date) };
        }),
        scenario: x.scenario,
      };
    });
  }, [colors, scenarios]);
  return (
    <SimpleGrid breakpoints={[{ cols: 2, minWidth: "md" }]}>
      {charts.map((field) => (
        <Paper key={field} withBorder>
          <Title p="md" order={3}>
            {getChartTitle(field)}
          </Title>
          <Box sx={{ height: "12rem" }}>
            <ParentSize>
              {({ height, width }) => (
                <ComparisonChart
                  domain={d}
                  field="balance"
                  scenarios={scen}
                  size={{ height, width }}
                />
              )}
            </ParentSize>
          </Box>
        </Paper>
      ))}
    </SimpleGrid>
  );
}

function getChartTitle(
  field: Exclude<keyof AmortizationPayment, "date" | "paymentNumber">
): ReactNode {
  switch (field) {
    case "amount":
      return "Payment Amount";
    case "balance":
      return "Balance";
    case "interest":
      return "Interest Per Payment";
    case "interestToDate":
      return "Total Interest Paid";
    case "principal":
      return "Principal Per Payment";
    case "principalToDate":
      return "Total Principal Paid";
    default:
      throw new Error(`invalid AmortizationPayment field ${field}`);
  }
}

const charts = Object.freeze<
  Exclude<keyof AmortizationPayment, "date" | "paymentNumber">
>([
  "balance",
  "amount",
  "interest",
  "principal",
  "interestToDate",
  "principalToDate",
]);

async function fetchLoan(id: string, userId: string) {
  const loan = await prisma.loan.findUnique({
    where: { id },
    select: {
      loanAmount: true,
      periodInterestRate: true,
      periods: true,
      startDate: true,
      userId: true,
    },
  });
  if (!loan || loan.userId !== userId) {
    throw new Response(null, { status: 404 });
  }
  return loan;
}

function fetchScenarios(loanId: string) {
  return prisma.scenario.findMany({
    where: { loanId },
    select: {
      id: true,
      name: true,
      payments: {
        select: {
          from: true,
          principalAmount: true,
          to: true,
        },
      },
    },
    orderBy: [{ name: "asc" }],
  });
}
