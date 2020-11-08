import { useMutation, useQuery } from "@apollo/client";
import gql from "graphql-tag";

export interface AdditionalPayment {
  readonly from: Date;
  readonly id: string;
  readonly principalAmount: number;
  readonly to: Date;
}

export interface Loan {
  readonly id: string;
  readonly loanAmount: number;
  readonly name: string;
  readonly periodInterestRate: number;
  readonly periods: number;
  readonly periodType: PeriodType;
  readonly scenarios: readonly Scenario[];
  readonly startDate: Date;
}
export interface Scenario {
  readonly additionalPayments: readonly AdditionalPayment[];
  readonly id: string;
  readonly name: string;
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

const LOAN_QUERY = gql`
  query useLoan($id: ID!) {
    getLoan(id: $id) {
      id
      loanAmount
      id
      periodInterestRate
      periods
      periodType
      scenarios {
        additionalPayments {
          from
          id
          principalAmount
          to
        }
        id
        name
      }
      startDate
    }
  }
`;

export function useLoan(id: string): UseLoanResult {
  const { data, error = null, loading } = useQuery<
    { getLoan: Loan },
    { id: string }
  >(LOAN_QUERY, {
    variables: { id },
  });

  return {
    error,
    isLoading: loading,
    loan: data?.getLoan ?? null,
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

const LOANS_QUERY = gql`
  query useLoans {
    queryLoan {
      id
      loanAmount
      name
      periodInterestRate
      periods
      periodType
      startDate
    }
  }
`;

const CREATE_LOAN = gql`
  mutation createLoan($loan: AddLoanInput!) {
    addLoan(input: [$loan]) {
      loan {
        id
      }
    }
  }
`;

const DELETE_LOAN = gql`
  mutation deleteLoan($id: ID!) {
    deleteLoan(filter: { id: [$id] }) {
      numUids
    }
  }
`;

const UPDATE_LOAN = gql`
  mutation updateLoan($id: ID!, $changes: LoanPatch!) {
    updateLoan(input: { filter: { id: [$id] }, set: $changes }) {
      numUids
    }
  }
`;

export function useLoanActions(): UseLoanActionsResult {
  const [createLoan] = useMutation<
    { addLoan: { loan: Array<{ id: string }> } },
    { loan: LoanCreateModel & { scenarios: [] } }
  >(CREATE_LOAN, {
    awaitRefetchQueries: true,
    refetchQueries: [{ query: LOANS_QUERY }],
  });
  const [deleteLoan] = useMutation<unknown, { id: string }>(DELETE_LOAN, {
    awaitRefetchQueries: true,
    refetchQueries: [{ query: LOANS_QUERY }],
  });
  const [updateLoan] = useMutation<
    unknown,
    { changes: LoanUpdateModel; id: string }
  >(UPDATE_LOAN, {
    awaitRefetchQueries: true,
    refetchQueries: [{ query: LOANS_QUERY }],
  });

  return {
    async createLoan(loan) {
      const { data } = await createLoan({
        variables: {
          loan: { ...loan, scenarios: [] },
        },
      });
      return data!.addLoan.loan[0].id;
    },
    async deleteLoan(id) {
      await deleteLoan({
        variables: { id },
      });
    },
    async updateLoan(id, changes) {
      updateLoan({
        variables: { changes, id },
      });
    },
  };
}

export interface UseLoansResult {
  error: Error | null;
  isLoading: boolean;
  loans: readonly Omit<Loan, "scenarios">[];
}

export function useLoans(): UseLoansResult {
  const { data, error = null, loading } = useQuery<{
    queryLoan: Omit<Loan, "scenarios">[];
  }>(LOANS_QUERY);
  return {
    error,
    isLoading: loading,
    loans: data?.queryLoan ?? [],
  };
}
