import * as Types from "../../graphtypes.generated";

import { DocumentNode } from "graphql";
import * as ApolloReactCommon from "@apollo/react-common";
import * as ApolloReactHooks from "@apollo/react-hooks";

export type LoansQueryVariables = {};

export type LoansQuery = { readonly __typename?: "Query" } & {
  readonly loans: ReadonlyArray<Types.Maybe<{ readonly __typename?: "Loan" } & Pick<Types.Loan, "id" | "name">>>;
};

export const LoansDocument: DocumentNode = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Loans" },
      variableDefinitions: [],
      directives: [],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "loans" },
            arguments: [],
            directives: [],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
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
 * __useLoansQuery__
 *
 * To run a query within a React component, call `useLoansQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoansQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoansQuery({
 *   variables: {
 *   },
 * });
 */
export function useLoansQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<LoansQuery, LoansQueryVariables>) {
  return ApolloReactHooks.useQuery<LoansQuery, LoansQueryVariables>(LoansDocument, baseOptions);
}
export function useLoansLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<LoansQuery, LoansQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<LoansQuery, LoansQueryVariables>(LoansDocument, baseOptions);
}
export type LoansQueryHookResult = ReturnType<typeof useLoansQuery>;
export type LoansLazyQueryHookResult = ReturnType<typeof useLoansLazyQuery>;
export type LoansQueryResult = ApolloReactCommon.QueryResult<LoansQuery, LoansQueryVariables>;
