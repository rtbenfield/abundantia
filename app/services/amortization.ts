import { DateTime } from "luxon";
import type { Loan } from "~/services/prisma.server";

export interface AmortizationPayment {
  readonly amount: number;
  readonly balance: number;
  readonly date: Date;
  readonly interest: number;
  readonly interestToDate: number;
  readonly paymentNumber: number;
  readonly principal: number;
  readonly principalToDate: number;
}

interface MakeAmortizationOptions {
  additionalPayments?: ReadonlyArray<{
    from: Date;
    principalAmount: number;
    to: Date | null;
  }>;
}

function calculatePaymentAmount(
  loan: Pick<Loan, "loanAmount" | "periodInterestRate" | "periods">
): number {
  const interestRate = loan.periodInterestRate.toNumber();
  return (
    (loan.loanAmount *
      Math.pow(1 + interestRate, loan.periods) *
      interestRate) /
    (Math.pow(1 + interestRate, loan.periods) - 1)
  );
}

export function makeAmortizationSchedule(
  loan: Pick<
    Loan,
    "loanAmount" | "periods" | "periodInterestRate" | "startDate"
  >,
  options: MakeAmortizationOptions = {}
): readonly AmortizationPayment[] {
  const { additionalPayments = [] } = options;

  const startDate = DateTime.fromJSDate(loan.startDate);
  const amount = calculatePaymentAmount(loan);

  return Array.from({ length: loan.periods }).reduce<AmortizationPayment[]>(
    (prev, _, i) => {
      const last = prev[i - 1] ?? {
        balance: loan.loanAmount,
        interestToDate: 0,
        principalToDate: 0,
      };
      const interest = last.balance * loan.periodInterestRate.toNumber();
      const principal = amount - interest;

      const date = startDate.plus({ months: i }).toJSDate();
      const lastPaymentDate = startDate.plus({ months: i - 1 }).toJSDate();
      const additionalPrincipal = additionalPayments
        .filter((p) => p.from <= date && (!p.to || p.to >= lastPaymentDate))
        .reduce((prev, curr) => prev + curr.principalAmount, 0);

      prev.push({
        amount: amount + additionalPrincipal,
        balance: Math.max(last.balance - principal - additionalPrincipal, 0),
        date,
        interest,
        interestToDate: last.interestToDate + interest,
        paymentNumber: i + 1,
        principal: principal + additionalPrincipal,
        principalToDate: last.principalToDate + principal + additionalPrincipal,
      });

      return prev;
    },
    []
  );
}
