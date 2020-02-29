import * as Types from "../../graphtypes.generated";

import { DocumentNode } from "graphql";
import * as ApolloReactCommon from "@apollo/react-common";
import * as ApolloReactHooks from "@apollo/react-hooks";

export type CreatePaymentMutationVariables = {
  id: Types.Scalars["ID"];
  payment: Types.PaymentCreateWithoutLoanInput;
};

export type CreatePaymentMutation = { readonly __typename?: "Mutation" } & {
  readonly updateLoan: Types.Maybe<
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

export const CreatePaymentDocument: DocumentNode = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreatePayment" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "ID" } } },
          directives: [],
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "payment" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "PaymentCreateWithoutLoanInput" } },
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
            name: { kind: "Name", value: "updateLoan" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "data" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "payments" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "create" },
                            value: {
                              kind: "ListValue",
                              values: [{ kind: "Variable", name: { kind: "Name", value: "payment" } }],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
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
export type CreatePaymentMutationFn = ApolloReactCommon.MutationFunction<
  CreatePaymentMutation,
  CreatePaymentMutationVariables
>;

/**
 * __useCreatePaymentMutation__
 *
 * To run a mutation, you first call `useCreatePaymentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePaymentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPaymentMutation, { data, loading, error }] = useCreatePaymentMutation({
 *   variables: {
 *      id: // value for 'id'
 *      payment: // value for 'payment'
 *   },
 * });
 */
export function useCreatePaymentMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<CreatePaymentMutation, CreatePaymentMutationVariables>,
) {
  return ApolloReactHooks.useMutation<CreatePaymentMutation, CreatePaymentMutationVariables>(
    CreatePaymentDocument,
    baseOptions,
  );
}
export type CreatePaymentMutationHookResult = ReturnType<typeof useCreatePaymentMutation>;
export type CreatePaymentMutationResult = ApolloReactCommon.MutationResult<CreatePaymentMutation>;
export type CreatePaymentMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreatePaymentMutation,
  CreatePaymentMutationVariables
>;
