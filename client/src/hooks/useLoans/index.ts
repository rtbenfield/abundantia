import { PeriodType } from "../../graphtypes.generated";
import LoansQuery from "./LoansQuery.gql";
import { useCreateLoanMutation } from "./CreateLoanMutation.generated";
import { useDeleteLoanMutation } from "./DeleteLoanMutation.generated";
import { useLoansQuery } from "./LoansQuery.generated";

export interface Loan {
  readonly id: string;
  readonly name: string;
}

export interface LoanCreateModel {
  readonly loanAmount: number;
  readonly name: string;
  readonly periodInterestRate: number;
  readonly periods: number;
  readonly periodType: PeriodType;
  readonly startDate: Date;
}

export interface UseLoansResult {
  readonly error?: Error;
  readonly isLoading: boolean;
  readonly loans: readonly Loan[];
  createLoan(loan: LoanCreateModel): Promise<{ id: string }>;
  deleteLoan(id: string): Promise<void>;
}

export default function useLoans(): UseLoansResult {
  const { data, error, loading } = useLoansQuery();
  const [createLoan] = useCreateLoanMutation({
    awaitRefetchQueries: true,
    refetchQueries: [{ query: LoansQuery }],
  });
  const [deleteLoan] = useDeleteLoanMutation({
    awaitRefetchQueries: true,
    refetchQueries: [{ query: LoansQuery }],
  });

  return {
    createLoan: async loan => {
      const result = await createLoan({
        variables: {
          loan: {
            ...loan,
            startDate: loan.startDate.toISOString(),
          },
        },
      });
      if (result && result.data) {
        return result.data.createLoan;
      } else {
        throw new Error();
      }
    },
    deleteLoan: async id => {
      await deleteLoan({
        variables: {
          id,
        },
      });
    },
    error,
    isLoading: loading,
    loans: (data?.loans as readonly Loan[]) ?? [],
  };
}
