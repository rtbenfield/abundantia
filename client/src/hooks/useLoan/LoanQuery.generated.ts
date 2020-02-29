import * as Types from "../../graphtypes.generated";

import { DocumentNode } from "graphql";
import * as ApolloReactCommon from "@apollo/react-common";
import * as ApolloReactHooks from "@apollo/react-hooks";

export type LoanQueryVariables = {
  id: Types.Scalars["ID"];
};

export type LoanQuery = { readonly __typename?: "Query" } & {
  readonly loan: Types.Maybe<
    { readonly __typename?: "Loan" } & Pick<
      Types.Loan,
      "id" | "loanAmount" | "name" | "periodInterestRate" | "periods" | "periodType" | "startDate"
    > & {
        readonly payments: Types.Maybe<
          ReadonlyArray<
            { readonly __typename?: "Payment" } & Pick<Types.Payment, "date" | "id" | "interest" | "note" | "principal">
          >
        >;
      }
  >;
};

export const LoanDocument: DocumentNode = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Loan" },
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
            name: { kind: "Name", value: "loan" },
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
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" }, arguments: [], directives: [] },
                { kind: "Field", name: { kind: "Name", value: "loanAmount" }, arguments: [], directives: [] },
                { kind: "Field", name: { kind: "Name", value: "name" }, arguments: [], directives: [] },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "payments" },
                  arguments: [
                    {
                      kind: "Argument",
                      name: { kind: "Name", value: "orderBy" },
                      value: { kind: "EnumValue", value: "date_DESC" },
                    },
                  ],
                  directives: [],
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "date" }, arguments: [], directives: [] },
                      { kind: "Field", name: { kind: "Name", value: "id" }, arguments: [], directives: [] },
                      { kind: "Field", name: { kind: "Name", value: "interest" }, arguments: [], directives: [] },
                      { kind: "Field", name: { kind: "Name", value: "note" }, arguments: [], directives: [] },
                      { kind: "Field", name: { kind: "Name", value: "principal" }, arguments: [], directives: [] },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "periodInterestRate" }, arguments: [], directives: [] },
                { kind: "Field", name: { kind: "Name", value: "periods" }, arguments: [], directives: [] },
                { kind: "Field", name: { kind: "Name", value: "periodType" }, arguments: [], directives: [] },
                { kind: "Field", name: { kind: "Name", value: "startDate" }, arguments: [], directives: [] },
              ],
            },
          },
        ],
      },
    },
  ],
};

/**
 * __useLoanQuery__
 *
 * To run a query within a React component, call `useLoanQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoanQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoanQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useLoanQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<LoanQuery, LoanQueryVariables>) {
  return ApolloReactHooks.useQuery<LoanQuery, LoanQueryVariables>(LoanDocument, baseOptions);
}
export function useLoanLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<LoanQuery, LoanQueryVariables>) {
  return ApolloReactHooks.useLazyQuery<LoanQuery, LoanQueryVariables>(LoanDocument, baseOptions);
}
export type LoanQueryHookResult = ReturnType<typeof useLoanQuery>;
export type LoanLazyQueryHookResult = ReturnType<typeof useLoanLazyQuery>;
export type LoanQueryResult = ApolloReactCommon.QueryResult<LoanQuery, LoanQueryVariables>;
