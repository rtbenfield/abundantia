import { useMemo } from "react";
import { Loan } from "../../hooks/useLoan";
import { AmortizationPayment } from "../../hooks/useScenarios";
import { makeAmortizationSchedule } from "./utils";

export interface LoanQueryResult {
  loan: Loan;
}

export function useAmortizationTransform(loan: Loan): readonly AmortizationPayment[] {
  return useMemo(() => {
    return makeAmortizationSchedule(loan);
  }, [loan.loanAmount, loan.periodInterestRate, loan.periods, loan.startDate]);
}
