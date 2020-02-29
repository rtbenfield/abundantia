import * as Types from "../../graphtypes.generated";

import { DocumentNode } from "graphql";
import * as ApolloReactCommon from "@apollo/react-common";
import * as ApolloReactHooks from "@apollo/react-hooks";

export type UpdateScenarioMutationVariables = {
  id: Types.Scalars["ID"];
  scenario: Types.ScenarioUpdateInput;
};

export type UpdateScenarioMutation = { readonly __typename?: "Mutation" } & {
  readonly updateScenarioClean: Types.Maybe<{ readonly __typename?: "Scenario" } & Pick<Types.Scenario, "id">>;
  readonly updateScenario: Types.Maybe<{ readonly __typename?: "Scenario" } & Pick<Types.Scenario, "id">>;
};

export const UpdateScenarioDocument: DocumentNode = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateScenario" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "ID" } } },
          directives: [],
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "scenario" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ScenarioUpdateInput" } },
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
            alias: { kind: "Name", value: "updateScenarioClean" },
            name: { kind: "Name", value: "updateScenario" },
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
              {
                kind: "Argument",
                name: { kind: "Name", value: "data" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "additionalPayments" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "deleteMany" },
                            value: { kind: "ObjectValue", fields: [] },
                          },
                        ],
                      },
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
          {
            kind: "Field",
            name: { kind: "Name", value: "updateScenario" },
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
export type UpdateScenarioMutationFn = ApolloReactCommon.MutationFunction<
  UpdateScenarioMutation,
  UpdateScenarioMutationVariables
>;

/**
 * __useUpdateScenarioMutation__
 *
 * To run a mutation, you first call `useUpdateScenarioMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateScenarioMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateScenarioMutation, { data, loading, error }] = useUpdateScenarioMutation({
 *   variables: {
 *      id: // value for 'id'
 *      scenario: // value for 'scenario'
 *   },
 * });
 */
export function useUpdateScenarioMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateScenarioMutation, UpdateScenarioMutationVariables>,
) {
  return ApolloReactHooks.useMutation<UpdateScenarioMutation, UpdateScenarioMutationVariables>(
    UpdateScenarioDocument,
    baseOptions,
  );
}
export type UpdateScenarioMutationHookResult = ReturnType<typeof useUpdateScenarioMutation>;
export type UpdateScenarioMutationResult = ApolloReactCommon.MutationResult<UpdateScenarioMutation>;
export type UpdateScenarioMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateScenarioMutation,
  UpdateScenarioMutationVariables
>;
