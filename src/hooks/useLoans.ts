import { useAuth0 } from "@auth0/auth0-react";
import {
  LoanFieldsFragmentDoc,
  useAddLoanMutation,
  useDeleteLoanMutation,
  useGetAllLoansQuery,
  useUpdateLoanMutation,
} from "./useLoans.generated";

export interface Loan {
  readonly id: string;
  readonly loanAmount: number;
  readonly name: string;
  readonly periodInterestRate: number;
  readonly periods: number;
  readonly periodType: PeriodType;
  readonly startDate: Date;
}

// export interface Payment {
//   readonly date: Date;
//   readonly id: string;
//   readonly interest: number;
//   readonly principal: number;
// }

export enum PeriodType {
  Monthly = "Monthly",
}

export interface UseLoanResult {
  error: Error | null;
  isLoading: boolean;
  loan: Loan | null;
}

export function useLoan(id: string): UseLoanResult {
  const { error, isLoading, loans } = useLoans();

  return {
    error,
    isLoading,
    loan: loans.find((x) => x.id === id) ?? null,
  };
}

export interface LoanUpdateModel {
  readonly loanAmount?: number;
  readonly name?: string;
  readonly periodInterestRate?: number;
  readonly periods?: number;
  readonly periodType: PeriodType;
  readonly startDate?: Date;
}

export interface LoanCreateModel {
  readonly loanAmount: number;
  readonly name: string;
  readonly periodInterestRate: number;
  readonly periods: number;
  readonly periodType: PeriodType;
  readonly startDate: Date;
}

export interface UseLoanActionsResult {
  createLoan(loan: LoanCreateModel): Promise<string>;
  deleteLoan(id: string): Promise<void>;
  updateLoan(id: string, changes: LoanUpdateModel): Promise<void>;
}

export function useLoanActions(): UseLoanActionsResult {
  const { user } = useAuth0();
  const [createLoan] = useAddLoanMutation({
    update(cache, { data }) {
      const newLoans = data?.addLoan?.loan ?? [];
      const newLoanRefs = newLoans
        .filter((x): x is Exclude<typeof x, null> => Boolean(x))
        .map((x) =>
          cache.writeFragment({
            data: x,
            fragment: LoanFieldsFragmentDoc,
          }),
        );
      cache.modify({
        fields: {
          queryLoan(existingLoans = []) {
            return [...existingLoans, ...newLoanRefs];
          },
        },
      });
    },
  });
  const [deleteLoan] = useDeleteLoanMutation({
    update(cache, { data }) {
      const removedLoans = data?.deleteLoan?.loan ?? [];
      removedLoans
        .filter((x): x is Exclude<typeof x, null> => Boolean(x))
        .map((x) => cache.identify(x))
        .forEach((ref) => cache.evict({ id: ref }));
      cache.gc();
    },
  });
  const [updateLoan] = useUpdateLoanMutation();

  return {
    async createLoan(loan) {
      const { data } = await createLoan({
        variables: {
          loan: {
            ...loan,
            owner: user.sub,
            scenarios: [],
          },
        },
      });
      const id = data?.addLoan?.loan?.map((x) => x?.id)[0];
      if (!id) {
        throw new Error("Failed to create loan");
      } else {
        return id;
      }
    },
    async deleteLoan(id) {
      await deleteLoan({
        variables: { id },
      });
    },
    async updateLoan(id, changes) {
      await updateLoan({
        variables: {
          changes,
          id,
        },
      });
    },
  };
}

export interface UseLoansResult {
  error: Error | null;
  isLoading: boolean;
  loans: readonly Loan[];
}

export function useLoans(): UseLoansResult {
  const { data, error = null, loading: isLoading } = useGetAllLoansQuery();
  const loans = (data?.queryLoan ?? [])
    .filter((x): x is Exclude<typeof x, null> => Boolean(x))
    .map<Loan>((x) => x);
  return {
    error,
    isLoading,
    loans,
  };
}
