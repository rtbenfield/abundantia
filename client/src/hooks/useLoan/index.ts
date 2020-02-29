import { useMemo } from "react";
import { useLoanQuery } from "./LoanQuery.generated";
import { useUpdateLoanMutation } from "./UpdateLoanMutation.generated";
import { useCreatePaymentMutation } from "./CreatePaymentMutation.generated";

export interface CreatePaymentModel {
  readonly date: Date;
  readonly interest: number;
  readonly note: string;
  readonly principal: number;
}

export interface Loan {
  readonly id: string;
  readonly loanAmount: number;
  readonly name: string;
  readonly payments: readonly Payment[];
  readonly periodInterestRate: number;
  readonly periods: number;
  readonly startDate: Date;
}

export interface LoanUpdateModel {
  readonly loanAmount?: number;
  readonly name?: string;
  readonly periodInterestRate?: number;
  readonly periods?: number;
  readonly startDate?: Date;
}

export interface Payment {
  readonly date: Date;
  readonly id: string;
  readonly interest: number;
  readonly note: string;
  readonly principal: number;
}

export interface UseLoanResult {
  readonly error?: Error;
  readonly isLoading: boolean;
  readonly loan?: Loan;
  createPayment(payment: CreatePaymentModel): Promise<void>;
  updateLoan(changes: LoanUpdateModel): Promise<void>;
}

export default function useLoan(id: string): UseLoanResult {
  const { data, error, loading } = useLoanQuery({
    variables: { id },
  });
  const [createPayment] = useCreatePaymentMutation();
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
    createPayment: async payment => {
      await createPayment({
        variables: {
          id,
          payment: {
            ...payment,
            date: payment.date.toISOString(),
          },
        },
      });
    },
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
