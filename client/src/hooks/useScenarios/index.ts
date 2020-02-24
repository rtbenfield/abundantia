import { useMemo } from "react";
import ScenariosQuery from "./ScenariosQuery.gql";
import { Loan, Scenario, ScenarioCreate, ScenarioModel } from "./types";
import { makeAmortizationSchedule } from "./utils";
import { useScenariosQuery } from "./ScenariosQuery.generated";
import { useAddScenarioMutation } from "./AddScenarioMutation.generated";
import { useRemoveScenarioMutation } from "./RemoveScenarioMutation.generated";
import { useUpdateScenarioMutation } from "./UpdateScenarioMutation.generated";

export * from "./types";

export interface UseScenariosResult {
  error?: Error;
  isLoading: boolean;
  scenarios: readonly Scenario[];
  addScenario(scenario: ScenarioCreate): Promise<{ id: string }>;
  removeScenario(scenario: ScenarioModel): void;
  updateScenario(scenario: ScenarioModel): void;
}

export default function useScenarios(loan: Loan): UseScenariosResult {
  const { data, error, loading } = useScenariosQuery({
    variables: { loanId: loan.id },
  });
  const [addScenario] = useAddScenarioMutation({
    awaitRefetchQueries: true,
    refetchQueries: [
      {
        query: ScenariosQuery,
        variables: { loanId: loan.id },
      },
    ],
  });
  const [removeScenario] = useRemoveScenarioMutation({
    awaitRefetchQueries: true,
    refetchQueries: [
      {
        query: ScenariosQuery,
        variables: { loanId: loan.id },
      },
    ],
  });
  const [updateScenario] = useUpdateScenarioMutation({
    awaitRefetchQueries: true,
    refetchQueries: [
      {
        query: ScenariosQuery,
        variables: { loanId: loan.id },
      },
    ],
  });

  const amortizedScenarios = useMemo<readonly Scenario[]>(() => {
    if (!data || !data.scenarios) {
      return [];
    }

    return data.scenarios.map<Scenario>(s => {
      const fixedPayments =
        s?.additionalPayments?.map(p => ({
          ...p,
          from: new Date(p.from),
          to: p.to ? new Date(p.to) : undefined,
        })) ?? [];
      const amortizationSchedule = makeAmortizationSchedule(loan, {
        additionalPayments: fixedPayments,
      });
      return {
        ...s!,
        additionalPayments: fixedPayments,
        amortizationSchedule,
      };
    });
  }, [data, loan]);

  return {
    addScenario: async (scenario: ScenarioCreate) => {
      const result = await addScenario({
        variables: {
          scenario: {
            additionalPayments: {
              create: scenario.additionalPayments.map(p => ({
                from: p.from.toISOString(),
                principalAmount: p.principalAmount,
                to: p.to?.toISOString(),
              })),
            },
            loan: {
              connect: {
                id: loan.id,
              },
            },
            name: scenario.name,
          },
        },
      });
      if (result && result.data) {
        return result.data.createScenario;
      } else {
        throw new Error();
      }
    },
    error,
    isLoading: loading,
    removeScenario: (scenario: ScenarioModel) => {
      removeScenario({
        variables: {
          id: scenario.id,
        },
      });
    },
    updateScenario: (scenario: ScenarioModel) => {
      updateScenario({
        variables: {
          id: scenario.id,
          scenario: {
            additionalPayments: {
              create: scenario.additionalPayments.map(p => ({
                from: p.from.toISOString(),
                principalAmount: p.principalAmount,
                to: p.to?.toISOString(),
              })),
            },
            name: scenario.name,
          },
        },
      });
    },
    scenarios: amortizedScenarios,
  };
}
