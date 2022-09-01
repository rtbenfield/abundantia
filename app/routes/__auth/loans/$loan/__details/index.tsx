import { Paper, Table } from "@mantine/core";
import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { z } from "zod";
import { makeAmortizationSchedule } from "~/services/amortization";
import { requireAuth } from "~/services/auth.server";
import { prisma } from "~/services/prisma.server";

const paramSchema = z.object({ loan: z.string() });

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
      loanAmount: true,
      periods: true,
      periodInterestRate: true,
      startDate: true,
      userId: true,
    },
  });
  if (!loan || loan.userId !== userId) {
    throw new Response(null, { status: 404 });
  }
  const amortization = makeAmortizationSchedule(loan);
  return json({ amortization });
}

export default function LoanDetailsAmortization() {
  const { amortization } = useLoaderData<typeof loader>();
  return (
    <Paper withBorder>
      <Table>
        <thead>
          <tr>
            <th>Payment</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Principal</th>
            <th>Interest</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {amortization.map((p) => (
            <tr key={p.paymentNumber}>
              <td>{count.format(p.paymentNumber)}</td>
              <td>{date.format(new Date(p.date))}</td>
              <td>{usd.format(p.amount * 100)}</td>
              <td>{usd.format(p.principal * 100)}</td>
              <td>{usd.format(p.interest * 100)}</td>
              <td>{usd.format(p.balance * 100)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Paper>
  );
}

const count = new Intl.NumberFormat("en-US");

const usd = new Intl.NumberFormat("en-US", {
  currency: "usd",
  style: "currency",
});

const date = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "numeric",
  year: "numeric",
});
