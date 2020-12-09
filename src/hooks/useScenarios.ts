import {
  ScenarioFieldsFragmentDoc,
  useAddScenarioMutation,
  useDeleteScenarioMutation,
  useLoanScenariosQuery,
  useUpdateScenarioMutation,
} from "./useScenarios.generated";

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

export function useScenarioActions(loanId: string): UseScenarioActionsResult {
  const [createScenario] = useAddScenarioMutation({
    update(cache, { data }) {
      const newScenarios = data?.addScenario?.scenario ?? [];
      const newScenarioRefs = newScenarios
        .filter((x): x is Exclude<typeof x, null> => Boolean(x))
        .map((x) =>
          cache.writeFragment({
            data: x,
            fragment: ScenarioFieldsFragmentDoc,
            variables: { loanId },
          }),
        );
      cache.modify({
        fields: {
          queryScenario(existingScenarios = []) {
            return [...existingScenarios, ...newScenarioRefs];
          },
        },
      });
    },
  });
  const [deleteScenario] = useDeleteScenarioMutation({
    update(cache, { data }) {
      const removedScenarios = data?.deleteScenario?.scenario ?? [];
      removedScenarios
        .filter((x): x is Exclude<typeof x, null> => Boolean(x))
        .map((x) => cache.identify(x))
        .forEach((ref) => cache.evict({ id: ref }));
      cache.gc();
    },
  });
  const [updateScenario] = useUpdateScenarioMutation();

  return {
    async createScenario(scenario) {
      const { data } = await createScenario({
        variables: {
          scenario: {
            ...scenario,
            additionalPayments: scenario.additionalPayments.map((x) => {
              return {
                from: x.from,
                principalAmount: x.principalAmount,
                to: x.to ?? null,
              };
            }),
            loan: { id: loanId },
          },
        },
      });
      const id = data?.addScenario?.scenario?.map((x) => x?.id)[0];
      if (!id) {
        throw new Error("Failed to create scenario");
      } else {
        return id;
      }
    },
    async deleteScenario(scenarioId) {
      await deleteScenario({
        variables: { loanId, scenarioId },
      });
    },
    async updateScenario(scenarioId, changes) {
      await updateScenario({
        variables: {
          changes: {
            ...changes,
            additionalPayments: changes.additionalPayments.map((x) => {
              return {
                from: x.from,
                principalAmount: x.principalAmount,
                to: x.to ?? null,
              };
            }),
          },
          id: scenarioId,
        },
      });
    },
  };
}

export interface UseScenariosResult {
  error: Error | null;
  isLoading: boolean;
  scenarios: readonly Scenario[];
}

export function useScenarios(loanId: string): UseScenariosResult {
  const { data, error = null, loading: isLoading } = useLoanScenariosQuery({
    variables: { loanId },
  });
  const scenarios = (data?.queryScenario ?? [])
    .filter((x): x is Exclude<typeof x, null> => Boolean(x))
    .map<Scenario>((x) => {
      return {
        ...x,
        additionalPayments: x.additionalPayments.map((y) => {
          return {
            ...y,
            from: y.from,
            to: y.to ? y.to : null,
          };
        }),
      };
    });
  return {
    error,
    isLoading,
    scenarios,
  };
}
