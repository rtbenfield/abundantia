import * as Types from "../../graphtypes.generated";

import { DocumentNode } from "graphql";
import * as ApolloReactCommon from "@apollo/react-common";
import * as ApolloReactHooks from "@apollo/react-hooks";

export type DeleteLoanMutationVariables = {
  id: Types.Scalars["ID"];
};

export type DeleteLoanMutation = { readonly __typename?: "Mutation" } & {
  readonly deleteLoan: Types.Maybe<{ readonly __typename?: "Loan" } & Pick<Types.Loan, "id">>;
};

export const DeleteLoanDocument: DocumentNode = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "DeleteLoan" },
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
            name: { kind: "Name", value: "deleteLoan" },
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
export type DeleteLoanMutationFn = ApolloReactCommon.MutationFunction<DeleteLoanMutation, DeleteLoanMutationVariables>;

/**
 * __useDeleteLoanMutation__
 *
 * To run a mutation, you first call `useDeleteLoanMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteLoanMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteLoanMutation, { data, loading, error }] = useDeleteLoanMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteLoanMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteLoanMutation, DeleteLoanMutationVariables>,
) {
  return ApolloReactHooks.useMutation<DeleteLoanMutation, DeleteLoanMutationVariables>(DeleteLoanDocument, baseOptions);
}
export type DeleteLoanMutationHookResult = ReturnType<typeof useDeleteLoanMutation>;
export type DeleteLoanMutationResult = ApolloReactCommon.MutationResult<DeleteLoanMutation>;
export type DeleteLoanMutationOptions = ApolloReactCommon.BaseMutationOptions<
  DeleteLoanMutation,
  DeleteLoanMutationVariables
>;
