import * as Types from "../../graphtypes.generated";

import { DocumentNode } from "graphql";
import * as ApolloReactCommon from "@apollo/react-common";
import * as ApolloReactHooks from "@apollo/react-hooks";

export type CreateLoanMutationVariables = {
  loan: Types.LoanCreateInput;
};

export type CreateLoanMutation = { readonly __typename?: "Mutation" } & {
  readonly createLoan: { readonly __typename?: "Loan" } & Pick<Types.Loan, "id">;
};

export const CreateLoanDocument: DocumentNode = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateLoan" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "loan" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "LoanCreateInput" } } },
          directives: [],
        },
      ],
      directives: [],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createLoan" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "data" },
                value: { kind: "Variable", name: { kind: "Name", value: "loan" } },
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
export type CreateLoanMutationFn = ApolloReactCommon.MutationFunction<CreateLoanMutation, CreateLoanMutationVariables>;

/**
 * __useCreateLoanMutation__
 *
 * To run a mutation, you first call `useCreateLoanMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateLoanMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createLoanMutation, { data, loading, error }] = useCreateLoanMutation({
 *   variables: {
 *      loan: // value for 'loan'
 *   },
 * });
 */
export function useCreateLoanMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<CreateLoanMutation, CreateLoanMutationVariables>,
) {
  return ApolloReactHooks.useMutation<CreateLoanMutation, CreateLoanMutationVariables>(CreateLoanDocument, baseOptions);
}
export type CreateLoanMutationHookResult = ReturnType<typeof useCreateLoanMutation>;
export type CreateLoanMutationResult = ApolloReactCommon.MutationResult<CreateLoanMutation>;
export type CreateLoanMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateLoanMutation,
  CreateLoanMutationVariables
>;
