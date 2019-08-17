import { useMutation, useQuery } from "@apollo/react-hooks";
import CreateLoanMutation from "./CreateLoanMutation.gql";
import DeleteLoanMutation from "./DeleteLoanMutation.gql";
import LoansQuery from "./LoansQuery.gql";

export interface Loan {
  id: string;
  name: string;
}

export interface LoanCreateModel {
  loanAmount: number;
  name: string;
  periodInterestRate: number;
  periods: number;
  periodType: PeriodType;
  startDate: Date;
}

interface LoanCreateInput {
  loan: {
    loanAmount: number;
    name: string;
    periodInterestRate: number;
    periods: number;
    startDate: Date;
  };
}

interface LoanQueryResult {
  loans: readonly Loan[];
}

export enum PeriodType {
  monthly = "Monthly",
  yearly = "Yearly",
}

export interface UseLoansResult {
  error?: Error;
  isLoading: boolean;
  loans: readonly Loan[];
  createLoan(loan: LoanCreateModel): Promise<{ id: string }>;
  deleteLoan(id: string): Promise<void>;
}

export default function useLoans(): UseLoansResult {
  const { data, error, loading } = useQuery<LoanQueryResult>(LoansQuery);
  const [createLoan] = useMutation<{ createLoan: { id: string } }, LoanCreateInput>(CreateLoanMutation, {
    awaitRefetchQueries: true,
    refetchQueries: [
      {
        query: LoansQuery,
      },
    ],
  });
  const [deleteLoan] = useMutation<{}, { id: string }>(DeleteLoanMutation, {
    awaitRefetchQueries: true,
    refetchQueries: [
      {
        query: LoansQuery,
      },
    ],
  });

  return {
    createLoan: async loan => {
      const result = await createLoan({
        variables: {
          loan,
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
    loans: data && data.loans ? data.loans : [],
  };
}
