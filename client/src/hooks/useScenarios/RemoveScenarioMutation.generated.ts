import * as Types from "../../graphtypes.generated";

import { DocumentNode } from "graphql";
import * as ApolloReactCommon from "@apollo/react-common";
import * as ApolloReactHooks from "@apollo/react-hooks";

export type RemoveScenarioMutationVariables = {
  id: Types.Scalars["ID"];
};

export type RemoveScenarioMutation = { readonly __typename?: "Mutation" } & {
  readonly deleteScenario: Types.Maybe<{ readonly __typename?: "Scenario" } & Pick<Types.Scenario, "id">>;
};

export const RemoveScenarioDocument: DocumentNode = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "RemoveScenario" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "ID" } } },
          directives: [],
        },
      ],
      directives: [],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteScenario" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "where" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "id" },
                      value: { kind: "Variable", name: { kind: "Name", value: "id" } },
                    },
                  ],
                },
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
export type RemoveScenarioMutationFn = ApolloReactCommon.MutationFunction<
  RemoveScenarioMutation,
  RemoveScenarioMutationVariables
>;

/**
 * __useRemoveScenarioMutation__
 *
 * To run a mutation, you first call `useRemoveScenarioMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveScenarioMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeScenarioMutation, { data, loading, error }] = useRemoveScenarioMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveScenarioMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<RemoveScenarioMutation, RemoveScenarioMutationVariables>,
) {
  return ApolloReactHooks.useMutation<RemoveScenarioMutation, RemoveScenarioMutationVariables>(
    RemoveScenarioDocument,
    baseOptions,
  );
}
export type RemoveScenarioMutationHookResult = ReturnType<typeof useRemoveScenarioMutation>;
export type RemoveScenarioMutationResult = ApolloReactCommon.MutationResult<RemoveScenarioMutation>;
export type RemoveScenarioMutationOptions = ApolloReactCommon.BaseMutationOptions<
  RemoveScenarioMutation,
  RemoveScenarioMutationVariables
>;
