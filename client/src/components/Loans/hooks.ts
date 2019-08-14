import { useMutation } from "@apollo/react-hooks";
import { useMemo } from "react";
import { AmortizationPayment, Loan, Payment } from "../../hooks/useLoan";
import CreatePaymentMutation from "./CreatePaymentMutation.gql";
import { makeAmortizationSchedule } from "./utils";

export interface CreatePaymentMutationVariables {
  id: string;
  payment: Omit<Payment, "id">;
}

export interface LoanQueryResult {
  loan: Loan;
}

export function useAmortizationTransform(loan: Loan): readonly AmortizationPayment[] {
  return useMemo(() => {
    return makeAmortizationSchedule(loan);
  }, [loan.loanAmount, loan.periodInterestRate, loan.periods, loan.startDate]);
}

export function useCreatePayment() {
  return useMutation<{}, CreatePaymentMutationVariables>(CreatePaymentMutation);
}
