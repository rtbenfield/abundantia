import { useMemo } from "react";
import { useLoanQuery } from "./LoanQuery.generated";
import { useUpdateLoanMutation } from "./UpdateLoanMutation.generated";

export interface AmortizationPayment {
  amount: number;
  balance: number;
  date: Date;
  interest: number;
  interestToDate: number;
  paymentNumber: number;
  principal: number;
  principalToDate: number;
}

export interface Loan {
  id: string;
  loanAmount: number;
  name: string;
  payments: readonly Payment[];
  periodInterestRate: number;
  periods: number;
  startDate: Date;
}

export interface LoanUpdateModel {
  loanAmount?: number;
  name?: string;
  periodInterestRate?: number;
  periods?: number;
  startDate?: Date;
}

export interface Payment {
  date: Date;
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
  isLoading: boolean;
  loan?: Loan;
  updateLoan(changes: LoanUpdateModel): Promise<void>;
}

export default function useLoan(id: string): UseLoanResult {
  const { data, error, loading } = useLoanQuery({
    variables: { id },
  });
  const [updateLoan] = useUpdateLoanMutation();

  const loan = useMemo<Loan | undefined>(() => {
    if (data && data.loan) {
      return {
        ...data.loan,
        payments: (data.loan.payments ?? []).map(p => {
          return {
            ...p,
            date: new Date(p.date),
          };
        }),
        startDate: new Date(data.loan.startDate),
      } as Loan;
    } else {
      return undefined;
    }
  }, [data]);

  return {
    error,
    isLoading: loading,
    loan,
    updateLoan: async changes => {
      await updateLoan({
        variables: {
          changes: {
            ...changes,
            startDate: changes.startDate?.toISOString(),
          },
          id,
        },
      });
    },
  };
}
