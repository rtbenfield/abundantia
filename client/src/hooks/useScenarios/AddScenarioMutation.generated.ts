import * as Types from "../../graphtypes.generated";

import { DocumentNode } from "graphql";
import * as ApolloReactCommon from "@apollo/react-common";
import * as ApolloReactHooks from "@apollo/react-hooks";

export type AddScenarioMutationVariables = {
  scenario: Types.ScenarioCreateInput;
};

export type AddScenarioMutation = { readonly __typename?: "Mutation" } & {
  readonly createScenario: { readonly __typename?: "Scenario" } & Pick<Types.Scenario, "id">;
};

export const AddScenarioDocument: DocumentNode = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "AddScenario" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "scenario" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ScenarioCreateInput" } },
          },
          directives: [],
        },
      ],
      directives: [],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createScenario" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "data" },
                value: { kind: "Variable", name: { kind: "Name", value: "scenario" } },
              },
            ],
            directives: [],
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "Field", name: { kind: "Name", value: "id" }, arguments: [], directives: [] }],
            },
          },
        ],
      },
    },
  ],
};
export type AddScenarioMutationFn = ApolloReactCommon.MutationFunction<
  AddScenarioMutation,
  AddScenarioMutationVariables
>;

/**
 * __useAddScenarioMutation__
 *
 * To run a mutation, you first call `useAddScenarioMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddScenarioMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addScenarioMutation, { data, loading, error }] = useAddScenarioMutation({
 *   variables: {
 *      scenario: // value for 'scenario'
 *   },
 * });
 */
export function useAddScenarioMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<AddScenarioMutation, AddScenarioMutationVariables>,
) {
  return ApolloReactHooks.useMutation<AddScenarioMutation, AddScenarioMutationVariables>(
    AddScenarioDocument,
    baseOptions,
  );
}
export type AddScenarioMutationHookResult = ReturnType<typeof useAddScenarioMutation>;
export type AddScenarioMutationResult = ApolloReactCommon.MutationResult<AddScenarioMutation>;
export type AddScenarioMutationOptions = ApolloReactCommon.BaseMutationOptions<
  AddScenarioMutation,
  AddScenarioMutationVariables
>;
