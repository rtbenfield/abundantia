import firebase from "firebase/app";
import { useEffect, useReducer } from "react";
import { useUser } from "./useUser";

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

export type Actions =
  | { type: "fetch" }
  | { loans: readonly Loan[]; type: "success" }
  | { error: Error; type: "error" }
  | { type: "reset" };

const defaultValue: UseLoansResult = {
  error: null,
  isLoading: true,
  loans: [],
};

function reducer(state: UseLoansResult, action: Actions): UseLoansResult {
  switch (action.type) {
    case "error":
      return { error: action.error, isLoading: false, loans: [] };
    case "fetch":
      return { error: null, isLoading: true, loans: state.loans };
    case "reset":
      return defaultValue;
    case "success":
      return { error: null, isLoading: false, loans: action.loans };
  }
}

const converter: firebase.firestore.FirestoreDataConverter<Loan> = {
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options)!;
    return {
      id: snapshot.id,
      loanAmount: data.loanAmount,
      name: data.name,
      periodInterestRate: data.periodInterestRate,
      periods: data.periods,
      periodType: data.periodType,
      startDate: data.startDate.toDate(),
    };
  },
  toFirestore(modelObject: Loan) {
    return {
      ...modelObject,
      startDate: firebase.firestore.Timestamp.fromDate(modelObject.startDate),
    };
  },
};

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

const createConverter: firebase.firestore.FirestoreDataConverter<LoanCreateModel> = {
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options)!;
    return {
      loanAmount: data.loanAmount,
      name: data.name,
      periodInterestRate: data.periodInterestRate,
      periodType: data.periodType,
      periods: data.periods,
      startDate: data.startDate.toDate(),
    };
  },
  toFirestore(modelObject: LoanCreateModel) {
    return {
      ...modelObject,
      startDate: firebase.firestore.Timestamp.fromDate(modelObject.startDate),
    };
  },
};

export function useLoanActions(): UseLoanActionsResult {
  const user = useUser();

  const loanStore = firebase
    .firestore()
    .collection(`users/${user?.uid}/loans`)
    .withConverter(createConverter);

  async function createLoan(loan: LoanCreateModel): Promise<string> {
    const d = await loanStore.add(loan);
    return d.id;
  }

  function deleteLoan(id: string): Promise<void> {
    return loanStore.doc(id).delete();
  }

  function updateLoan(id: string, changes: LoanUpdateModel): Promise<void> {
    return loanStore.doc(id).update(changes);
  }

  return {
    createLoan,
    deleteLoan,
    updateLoan,
  };
}

export interface UseLoansResult {
  error: Error | null;
  isLoading: boolean;
  loans: readonly Loan[];
}

export function useLoans(): UseLoansResult {
  const user = useUser();
  const [state, dispatch] = useReducer(reducer, defaultValue);
  useEffect(() => {
    if (user) {
      dispatch({ type: "fetch" });
      const loanStore = firebase
        .firestore()
        .collection(`users/${user.uid}/loans`)
        .withConverter(converter);
      const unsubscribe = loanStore.onSnapshot(
        (response) => {
          const data = response.docs.map<Loan>((x) => x.data());
          console.info("useLoans data", data);
          dispatch({ loans: data, type: "success" });
        },
        (err) => {
          dispatch({ error: err, type: "error" });
        },
      );
      return unsubscribe;
    } else {
      dispatch({ type: "reset" });
      return undefined;
    }
  }, [user]);
  return state;
}
