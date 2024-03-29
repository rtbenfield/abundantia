import firebase from "firebase/app";
import { useEffect, useReducer } from "react";
import { useUser } from "./useUser";

export interface Scenario {
  readonly additionalPayments: readonly ScenarioPayment[];
  readonly id: string;
  readonly name: string;
}

export interface ScenarioPayment {
  readonly from: Date;
  readonly id: string;
  readonly principalAmount: number;
  readonly to: Date | null;
}

export type Actions =
  | { type: "fetch" }
  | { scenarios: readonly Scenario[]; type: "success" }
  | { error: Error; type: "error" }
  | { type: "reset" };

const defaultValue: UseScenariosResult = {
  error: null,
  isLoading: true,
  scenarios: [],
};

function reducer(
  state: UseScenariosResult,
  action: Actions,
): UseScenariosResult {
  switch (action.type) {
    case "error":
      return { error: action.error, isLoading: false, scenarios: [] };
    case "fetch":
      return { error: null, isLoading: true, scenarios: state.scenarios };
    case "reset":
      return defaultValue;
    case "success":
      return { error: null, isLoading: false, scenarios: action.scenarios };
  }
}

export interface ScenarioCreateModel {
  readonly additionalPayments: readonly ScenarioPaymentCreateModel[];
  readonly name: string;
}

export interface ScenarioPaymentCreateModel {
  readonly from: Date;
  readonly principalAmount: number;
  readonly to: Date | null;
}

export interface UseScenarioActionsResult {
  createScenario(scenario: ScenarioCreateModel): Promise<string>;
  deleteScenario(scenarioId: string): Promise<void>;
  updateScenario(
    scenarioId: string,
    changes: ScenarioCreateModel,
  ): Promise<void>;
}

const createConverter: firebase.firestore.FirestoreDataConverter<ScenarioCreateModel> = {
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options)!;
    return {
      additionalPayments: (data.additionalPayments as any[]).map<
        ScenarioPayment
      >((x) => {
        return {
          from: x.from.toDate(),
          id: Math.random().toString(),
          principalAmount: x.principalAmount,
          to: x.to?.toDate() ?? null,
        };
      }),
      name: data.name,
    };
  },
  toFirestore(modelObject: ScenarioCreateModel) {
    return {
      additionalPayments: modelObject.additionalPayments.map((x) => {
        return {
          from: firebase.firestore.Timestamp.fromDate(x.from),
          principalAmount: x.principalAmount,
          to: x.to ? firebase.firestore.Timestamp.fromDate(x.to) : null,
        };
      }),
      name: modelObject.name,
    };
  },
};

const converter: firebase.firestore.FirestoreDataConverter<Scenario> = {
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options)!;
    return {
      additionalPayments: (data.additionalPayments as any[]).map<
        ScenarioPayment
      >((x) => {
        return {
          from: x.from.toDate(),
          id: Math.random().toString(),
          principalAmount: x.principalAmount,
          to: x.to?.toDate() ?? null,
        };
      }),
      id: snapshot.id,
      name: data.name,
    };
  },
  toFirestore(modelObject: Scenario) {
    return {
      additionalPayments: modelObject.additionalPayments.map((x) => {
        return {
          from: firebase.firestore.Timestamp.fromDate(x.from),
          principalAmount: x.principalAmount,
          to: x.to ? firebase.firestore.Timestamp.fromDate(x.to) : null,
        };
      }),
      name: modelObject.name,
    };
  },
};

export function useScenarioActions(loanId: string): UseScenarioActionsResult {
  const user = useUser();

  const scenarioStore = firebase
    .firestore()
    .collection(`users/${user?.uid}/loans/${loanId}/scenarios`)
    .withConverter(createConverter);

  async function createScenario(
    scenario: ScenarioCreateModel,
  ): Promise<string> {
    const d = await scenarioStore.add(scenario);
    return d.id;
  }

  function deleteScenario(id: string): Promise<void> {
    return scenarioStore.doc(id).delete();
  }

  function updateScenario(
    id: string,
    changes: ScenarioCreateModel,
  ): Promise<void> {
    return scenarioStore.doc(id).update(changes);
  }

  return {
    createScenario,
    deleteScenario,
    updateScenario,
  };
}

export interface UseScenariosResult {
  error: Error | null;
  isLoading: boolean;
  scenarios: readonly Scenario[];
}

export function useScenarios(loanId: string): UseScenariosResult {
  const user = useUser();
  const [state, dispatch] = useReducer(reducer, defaultValue);
  useEffect(() => {
    if (user) {
      dispatch({ type: "fetch" });
      const unsubscribe = firebase
        .firestore()
        .collection(`users/${user.uid}/loans/${loanId}/scenarios`)
        .withConverter(converter)
        .onSnapshot(
          (response) => {
            const data = response.docs.map<Scenario>((x) => x.data());
            console.info("useScenarios data", data);
            dispatch({ scenarios: data, type: "success" });
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
