import { useQuery, useMutation } from "@apollo/react-hooks";
import { useMemo } from "react";
import AddScenarioMutation from "./AddScenarioMutation.gql";
import RemoveScenarioMutation from "./RemoveScenarioMutation.gql";
import ScenariosQuery from "./ScenariosQuery.gql";
import { Loan, QueryResults, Scenario, ScenarioCreate, ScenarioModel, ScenarioPaymentCreate } from "./types";
import UpdateScenarioMutation from "./UpdateScenarioMutation.gql";
import { makeAmortizationSchedule } from "./utils";

export * from "./types";

export interface UseScenariosResult {
  error?: Error;
  isLoading: boolean;
  scenarios: readonly Scenario[];
  addScenario(scenario: ScenarioCreate): Promise<{ id: string }>;
  removeScenario(scenario: ScenarioModel): void;
  updateScenario(scenario: ScenarioModel): void;
}

interface ScenarioCreateModel {
  additionalPayments: {
    create: readonly ScenarioPaymentCreate[];
  };
  loan: {
    connect: {
      id: string;
    };
  };
  name: string;
}

interface ScenarioUpdateModel {
  additionalPayments?: {
    create: readonly ScenarioPaymentCreate[];
  };
  name?: string;
}

export default function useScenarios(loan: Loan): UseScenariosResult {
  const { data, error, loading } = useQuery<QueryResults>(ScenariosQuery, {
    variables: {
      loanId: loan.id,
    },
  });
  const [addScenario] = useMutation<{ createScenario: { id: string } }, { scenario: ScenarioCreateModel }>(
    AddScenarioMutation,
    {
      awaitRefetchQueries: true,
      refetchQueries: [
        {
          query: ScenariosQuery,
          variables: { loanId: loan.id },
        },
      ],
    },
  );
  const [removeScenario] = useMutation<{}, { id: string }>(RemoveScenarioMutation, {
    awaitRefetchQueries: true,
    refetchQueries: [
      {
        query: ScenariosQuery,
        variables: { loanId: loan.id },
      },
    ],
  });
  const [updateScenario] = useMutation<{}, { id: string; scenario: ScenarioUpdateModel }>(UpdateScenarioMutation, {
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
      const fixedPayments = s.additionalPayments.map(p => ({
        ...p,
        from: new Date(p.from),
        to: p.to ? new Date(p.to) : undefined,
      }));
      const amortizationSchedule = makeAmortizationSchedule(loan, {
        additionalPayments: fixedPayments,
      });
      return {
        ...s,
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
                from: p.from,
                principalAmount: p.principalAmount,
                to: p.to,
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
                from: p.from,
                principalAmount: p.principalAmount,
                to: p.to,
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
