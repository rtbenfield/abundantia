import * as Types from "../../graphtypes.generated";

import { DocumentNode } from "graphql";
import * as ApolloReactCommon from "@apollo/react-common";
import * as ApolloReactHooks from "@apollo/react-hooks";

export type ScenariosQueryVariables = {
  loanId: Types.Scalars["ID"];
};

export type ScenariosQuery = { readonly __typename?: "Query" } & {
  readonly scenarios: ReadonlyArray<
    Types.Maybe<
      { readonly __typename?: "Scenario" } & Pick<Types.Scenario, "id" | "name"> & {
          readonly additionalPayments: Types.Maybe<
            ReadonlyArray<
              { readonly __typename?: "ScenarioPayment" } & Pick<
                Types.ScenarioPayment,
                "from" | "id" | "principalAmount" | "to"
              >
            >
          >;
        }
    >
  >;
};

export const ScenariosDocument: DocumentNode = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Scenarios" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "loanId" } },
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
            name: { kind: "Name", value: "scenarios" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "where" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "loan" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "id" },
                            value: { kind: "Variable", name: { kind: "Name", value: "loanId" } },
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
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "additionalPayments" },
                  arguments: [],
                  directives: [],
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "from" }, arguments: [], directives: [] },
                      { kind: "Field", name: { kind: "Name", value: "id" }, arguments: [], directives: [] },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "principalAmount" },
                        arguments: [],
                        directives: [],
                      },
                      { kind: "Field", name: { kind: "Name", value: "to" }, arguments: [], directives: [] },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "id" }, arguments: [], directives: [] },
                { kind: "Field", name: { kind: "Name", value: "name" }, arguments: [], directives: [] },
              ],
            },
          },
        ],
      },
    },
  ],
};

/**
 * __useScenariosQuery__
 *
 * To run a query within a React component, call `useScenariosQuery` and pass it any options that fit your needs.
 * When your component renders, `useScenariosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useScenariosQuery({
 *   variables: {
 *      loanId: // value for 'loanId'
 *   },
 * });
 */
export function useScenariosQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<ScenariosQuery, ScenariosQueryVariables>,
) {
  return ApolloReactHooks.useQuery<ScenariosQuery, ScenariosQueryVariables>(ScenariosDocument, baseOptions);
}
export function useScenariosLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ScenariosQuery, ScenariosQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<ScenariosQuery, ScenariosQueryVariables>(ScenariosDocument, baseOptions);
}
export type ScenariosQueryHookResult = ReturnType<typeof useScenariosQuery>;
export type ScenariosLazyQueryHookResult = ReturnType<typeof useScenariosLazyQuery>;
export type ScenariosQueryResult = ApolloReactCommon.QueryResult<ScenariosQuery, ScenariosQueryVariables>;
