import { DateTime } from "luxon";
import { AmortizationPayment, Loan } from "../../hooks/useLoan";

interface MakeAmortizationOptions {
  additionalPayments?: ReadonlyArray<{
    from: Date;
    principalAmount: number;
    to?: Date;
  }>;
}

function calculatePaymentAmount(loan: Loan): number {
  return (
    (loan.loanAmount * Math.pow(1 + loan.periodInterestRate, loan.periods) * loan.periodInterestRate) /
    (Math.pow(1 + loan.periodInterestRate, loan.periods) - 1)
  );
}

export function makeAmortizationSchedule(
  loan: Loan,
  options: MakeAmortizationOptions = {},
): readonly AmortizationPayment[] {
  const { additionalPayments = [] } = options;

  const startDate = DateTime.fromJSDate(loan.startDate);
  const amount = calculatePaymentAmount(loan);

  return Array.from({ length: loan.periods }).reduce<AmortizationPayment[]>((prev, _, i) => {
    const last = prev[i - 1] || { balance: loan.loanAmount };
    const interest = last.balance * loan.periodInterestRate;
    const principal = amount - interest;

    const date = startDate.plus({ months: i }).toJSDate();
    const lastPaymentDate = startDate.plus({ months: i - 1 }).toJSDate();
    const additionalPrincipal = additionalPayments
      .filter(p => p.from <= date && (!p.to || p.to >= lastPaymentDate))
      .reduce((prev, curr) => prev + curr.principalAmount, 0);

    prev.push({
      amount: amount + additionalPrincipal,
      balance: Math.max(last.balance - principal - additionalPrincipal, 0),
      date,
      interest,
      paymentNumber: i + 1,
      principal: principal + additionalPrincipal,
    });

    return prev;
  }, []);
}
