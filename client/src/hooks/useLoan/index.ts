import { useMutation, useQuery } from "@apollo/react-hooks";
import { useMemo } from "react";
import LoanQuery from "./LoanQuery.gql";
import UpdateLoanMutation from "./UpdateLoanMutation.gql";

export interface AmortizationPayment {
  amount: number;
  balance: number;
  date: Date;
  interest: number;
  paymentNumber: number;
  principal: number;
}

export interface Loan {
  id: string;
  loanAmount: number;
  name: string;
  payments: readonly Payment[];
  periodInterestRate: number;
  periods: number;
  periodType: PeriodType;
  startDate: Date;
}

interface LoanQueryResult {
  loan: {
    id: string;
    loanAmount: number;
    name: string;
    payments: readonly Payment[];
    periodInterestRate: number;
    periods: number;
    periodType: PeriodType;
    startDate: string;
  };
}

interface LoanUpdateInput {
  changes: {
    loanAmount?: number;
    name?: string;
    periodInterestRate?: number;
    periods?: number;
    startDate?: Date;
  };
  id: string;
}

export interface LoanUpdateModel {
  loanAmount?: number;
  name?: string;
  periodInterestRate?: number;
  periods?: number;
  startDate?: Date;
}

export interface Payment {
  date: string;
  id: string;
  interest: number;
  note: string;
  principal: number;
}

export enum PeriodType {
  monthly = "Monthly",
  yearly = "Yearly",
}

export interface UseLoanResult {
  error?: Error;
  loading: boolean;
  loan?: Loan;
  updateLoan(changes: LoanUpdateModel): Promise<void>;
}

export default function useLoan(id: string): UseLoanResult {
  const { data, error, loading } = useQuery<LoanQueryResult>(LoanQuery, {
    variables: {
      id,
    },
  });
  const [updateLoan] = useMutation<{}, LoanUpdateInput>(UpdateLoanMutation);
  const loan = useMemo<Loan | undefined>(() => {
    if (data && data.loan) {
      return {
        ...data.loan,
        startDate: new Date(data.loan.startDate),
      };
    } else {
      return undefined;
    }
  }, [data]);

  return {
    error,
    loading,
    loan,
    updateLoan: async changes => {
      await updateLoan({
        variables: {
          id,
          changes,
        },
      });
    },
  };
}
