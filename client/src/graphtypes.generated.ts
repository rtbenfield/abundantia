export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: string;
  Long: any;
};

export type AggregateLoan = {
  readonly __typename?: "AggregateLoan";
  readonly count: Scalars["Int"];
};

export type AggregatePayment = {
  readonly __typename?: "AggregatePayment";
  readonly count: Scalars["Int"];
};

export type AggregateScenario = {
  readonly __typename?: "AggregateScenario";
  readonly count: Scalars["Int"];
};

export type AggregateScenarioPayment = {
  readonly __typename?: "AggregateScenarioPayment";
  readonly count: Scalars["Int"];
};

export type BatchPayload = {
  readonly __typename?: "BatchPayload";
  readonly count: Scalars["Long"];
};

export type Loan = Node & {
  readonly __typename?: "Loan";
  readonly id: Scalars["ID"];
  readonly loanAmount: Scalars["Float"];
  readonly name: Scalars["String"];
  readonly payments?: Maybe<ReadonlyArray<Payment>>;
  readonly periodInterestRate: Scalars["Float"];
  readonly periods: Scalars["Int"];
  readonly periodType: PeriodType;
  readonly scenarios?: Maybe<ReadonlyArray<Scenario>>;
  readonly startDate: Scalars["DateTime"];
};

export type LoanPaymentsArgs = {
  where?: Maybe<PaymentWhereInput>;
  orderBy?: Maybe<PaymentOrderByInput>;
  skip?: Maybe<Scalars["Int"]>;
  after?: Maybe<Scalars["String"]>;
  before?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Int"]>;
  last?: Maybe<Scalars["Int"]>;
};

export type LoanScenariosArgs = {
  where?: Maybe<ScenarioWhereInput>;
  orderBy?: Maybe<ScenarioOrderByInput>;
  skip?: Maybe<Scalars["Int"]>;
  after?: Maybe<Scalars["String"]>;
  before?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Int"]>;
  last?: Maybe<Scalars["Int"]>;
};

export type LoanConnection = {
  readonly __typename?: "LoanConnection";
  readonly pageInfo: PageInfo;
  readonly edges: ReadonlyArray<Maybe<LoanEdge>>;
  readonly aggregate: AggregateLoan;
};

export type LoanCreateInput = {
  readonly id?: Maybe<Scalars["ID"]>;
  readonly loanAmount: Scalars["Float"];
  readonly name: Scalars["String"];
  readonly periodInterestRate: Scalars["Float"];
  readonly periods: Scalars["Int"];
  readonly periodType: PeriodType;
  readonly startDate: Scalars["DateTime"];
  readonly payments?: Maybe<PaymentCreateManyWithoutLoanInput>;
  readonly scenarios?: Maybe<ScenarioCreateManyWithoutLoanInput>;
};

export type LoanCreateOneWithoutPaymentsInput = {
  readonly create?: Maybe<LoanCreateWithoutPaymentsInput>;
  readonly connect?: Maybe<LoanWhereUniqueInput>;
};

export type LoanCreateOneWithoutScenariosInput = {
  readonly create?: Maybe<LoanCreateWithoutScenariosInput>;
  readonly connect?: Maybe<LoanWhereUniqueInput>;
};

export type LoanCreateWithoutPaymentsInput = {
  readonly id?: Maybe<Scalars["ID"]>;
  readonly loanAmount: Scalars["Float"];
  readonly name: Scalars["String"];
  readonly periodInterestRate: Scalars["Float"];
  readonly periods: Scalars["Int"];
  readonly periodType: PeriodType;
  readonly startDate: Scalars["DateTime"];
  readonly scenarios?: Maybe<ScenarioCreateManyWithoutLoanInput>;
};

export type LoanCreateWithoutScenariosInput = {
  readonly id?: Maybe<Scalars["ID"]>;
  readonly loanAmount: Scalars["Float"];
  readonly name: Scalars["String"];
  readonly periodInterestRate: Scalars["Float"];
  readonly periods: Scalars["Int"];
  readonly periodType: PeriodType;
  readonly startDate: Scalars["DateTime"];
  readonly payments?: Maybe<PaymentCreateManyWithoutLoanInput>;
};

export type LoanEdge = {
  readonly __typename?: "LoanEdge";
  readonly node: Loan;
  readonly cursor: Scalars["String"];
};

export enum LoanOrderByInput {
  IdAsc = "id_ASC",
  IdDesc = "id_DESC",
  LoanAmountAsc = "loanAmount_ASC",
  LoanAmountDesc = "loanAmount_DESC",
  NameAsc = "name_ASC",
  NameDesc = "name_DESC",
  PeriodInterestRateAsc = "periodInterestRate_ASC",
  PeriodInterestRateDesc = "periodInterestRate_DESC",
  PeriodsAsc = "periods_ASC",
  PeriodsDesc = "periods_DESC",
  PeriodTypeAsc = "periodType_ASC",
  PeriodTypeDesc = "periodType_DESC",
  StartDateAsc = "startDate_ASC",
  StartDateDesc = "startDate_DESC",
}

export type LoanPreviousValues = {
  readonly __typename?: "LoanPreviousValues";
  readonly id: Scalars["ID"];
  readonly loanAmount: Scalars["Float"];
  readonly name: Scalars["String"];
  readonly periodInterestRate: Scalars["Float"];
  readonly periods: Scalars["Int"];
  readonly periodType: PeriodType;
  readonly startDate: Scalars["DateTime"];
};

export type LoanSubscriptionPayload = {
  readonly __typename?: "LoanSubscriptionPayload";
  readonly mutation: MutationType;
  readonly node?: Maybe<Loan>;
  readonly updatedFields?: Maybe<ReadonlyArray<Scalars["String"]>>;
  readonly previousValues?: Maybe<LoanPreviousValues>;
};

export type LoanSubscriptionWhereInput = {
  readonly AND?: Maybe<ReadonlyArray<LoanSubscriptionWhereInput>>;
  readonly OR?: Maybe<ReadonlyArray<LoanSubscriptionWhereInput>>;
  readonly NOT?: Maybe<ReadonlyArray<LoanSubscriptionWhereInput>>;
  readonly mutation_in?: Maybe<ReadonlyArray<MutationType>>;
  readonly updatedFields_contains?: Maybe<Scalars["String"]>;
  readonly updatedFields_contains_every?: Maybe<ReadonlyArray<Scalars["String"]>>;
  readonly updatedFields_contains_some?: Maybe<ReadonlyArray<Scalars["String"]>>;
  readonly node?: Maybe<LoanWhereInput>;
};

export type LoanUpdateInput = {
  readonly loanAmount?: Maybe<Scalars["Float"]>;
  readonly name?: Maybe<Scalars["String"]>;
  readonly periodInterestRate?: Maybe<Scalars["Float"]>;
  readonly periods?: Maybe<Scalars["Int"]>;
  readonly periodType?: Maybe<PeriodType>;
  readonly startDate?: Maybe<Scalars["DateTime"]>;
  readonly payments?: Maybe<PaymentUpdateManyWithoutLoanInput>;
  readonly scenarios?: Maybe<ScenarioUpdateManyWithoutLoanInput>;
};

export type LoanUpdateManyMutationInput = {
  readonly loanAmount?: Maybe<Scalars["Float"]>;
  readonly name?: Maybe<Scalars["String"]>;
  readonly periodInterestRate?: Maybe<Scalars["Float"]>;
  readonly periods?: Maybe<Scalars["Int"]>;
  readonly periodType?: Maybe<PeriodType>;
  readonly startDate?: Maybe<Scalars["DateTime"]>;
};

export type LoanUpdateOneRequiredWithoutPaymentsInput = {
  readonly create?: Maybe<LoanCreateWithoutPaymentsInput>;
  readonly connect?: Maybe<LoanWhereUniqueInput>;
  readonly update?: Maybe<LoanUpdateWithoutPaymentsDataInput>;
  readonly upsert?: Maybe<LoanUpsertWithoutPaymentsInput>;
};

export type LoanUpdateOneRequiredWithoutScenariosInput = {
  readonly create?: Maybe<LoanCreateWithoutScenariosInput>;
  readonly connect?: Maybe<LoanWhereUniqueInput>;
  readonly update?: Maybe<LoanUpdateWithoutScenariosDataInput>;
  readonly upsert?: Maybe<LoanUpsertWithoutScenariosInput>;
};

export type LoanUpdateWithoutPaymentsDataInput = {
  readonly loanAmount?: Maybe<Scalars["Float"]>;
  readonly name?: Maybe<Scalars["String"]>;
  readonly periodInterestRate?: Maybe<Scalars["Float"]>;
  readonly periods?: Maybe<Scalars["Int"]>;
  readonly periodType?: Maybe<PeriodType>;
  readonly startDate?: Maybe<Scalars["DateTime"]>;
  readonly scenarios?: Maybe<ScenarioUpdateManyWithoutLoanInput>;
};

export type LoanUpdateWithoutScenariosDataInput = {
  readonly loanAmount?: Maybe<Scalars["Float"]>;
  readonly name?: Maybe<Scalars["String"]>;
  readonly periodInterestRate?: Maybe<Scalars["Float"]>;
  readonly periods?: Maybe<Scalars["Int"]>;
  readonly periodType?: Maybe<PeriodType>;
  readonly startDate?: Maybe<Scalars["DateTime"]>;
  readonly payments?: Maybe<PaymentUpdateManyWithoutLoanInput>;
};

export type LoanUpsertWithoutPaymentsInput = {
  readonly update: LoanUpdateWithoutPaymentsDataInput;
  readonly create: LoanCreateWithoutPaymentsInput;
};

export type LoanUpsertWithoutScenariosInput = {
  readonly update: LoanUpdateWithoutScenariosDataInput;
  readonly create: LoanCreateWithoutScenariosInput;
};

export type LoanWhereInput = {
  readonly AND?: Maybe<ReadonlyArray<LoanWhereInput>>;
  readonly OR?: Maybe<ReadonlyArray<LoanWhereInput>>;
  readonly NOT?: Maybe<ReadonlyArray<LoanWhereInput>>;
  readonly id?: Maybe<Scalars["ID"]>;
  readonly id_not?: Maybe<Scalars["ID"]>;
  readonly id_in?: Maybe<ReadonlyArray<Scalars["ID"]>>;
  readonly id_not_in?: Maybe<ReadonlyArray<Scalars["ID"]>>;
  readonly id_lt?: Maybe<Scalars["ID"]>;
  readonly id_lte?: Maybe<Scalars["ID"]>;
  readonly id_gt?: Maybe<Scalars["ID"]>;
  readonly id_gte?: Maybe<Scalars["ID"]>;
  readonly id_contains?: Maybe<Scalars["ID"]>;
  readonly id_not_contains?: Maybe<Scalars["ID"]>;
  readonly id_starts_with?: Maybe<Scalars["ID"]>;
  readonly id_not_starts_with?: Maybe<Scalars["ID"]>;
  readonly id_ends_with?: Maybe<Scalars["ID"]>;
  readonly id_not_ends_with?: Maybe<Scalars["ID"]>;
  readonly loanAmount?: Maybe<Scalars["Float"]>;
  readonly loanAmount_not?: Maybe<Scalars["Float"]>;
  readonly loanAmount_in?: Maybe<ReadonlyArray<Scalars["Float"]>>;
  readonly loanAmount_not_in?: Maybe<ReadonlyArray<Scalars["Float"]>>;
  readonly loanAmount_lt?: Maybe<Scalars["Float"]>;
  readonly loanAmount_lte?: Maybe<Scalars["Float"]>;
  readonly loanAmount_gt?: Maybe<Scalars["Float"]>;
  readonly loanAmount_gte?: Maybe<Scalars["Float"]>;
  readonly name?: Maybe<Scalars["String"]>;
  readonly name_not?: Maybe<Scalars["String"]>;
  readonly name_in?: Maybe<ReadonlyArray<Scalars["String"]>>;
  readonly name_not_in?: Maybe<ReadonlyArray<Scalars["String"]>>;
  readonly name_lt?: Maybe<Scalars["String"]>;
  readonly name_lte?: Maybe<Scalars["String"]>;
  readonly name_gt?: Maybe<Scalars["String"]>;
  readonly name_gte?: Maybe<Scalars["String"]>;
  readonly name_contains?: Maybe<Scalars["String"]>;
  readonly name_not_contains?: Maybe<Scalars["String"]>;
  readonly name_starts_with?: Maybe<Scalars["String"]>;
  readonly name_not_starts_with?: Maybe<Scalars["String"]>;
  readonly name_ends_with?: Maybe<Scalars["String"]>;
  readonly name_not_ends_with?: Maybe<Scalars["String"]>;
  readonly periodInterestRate?: Maybe<Scalars["Float"]>;
  readonly periodInterestRate_not?: Maybe<Scalars["Float"]>;
  readonly periodInterestRate_in?: Maybe<ReadonlyArray<Scalars["Float"]>>;
  readonly periodInterestRate_not_in?: Maybe<ReadonlyArray<Scalars["Float"]>>;
  readonly periodInterestRate_lt?: Maybe<Scalars["Float"]>;
  readonly periodInterestRate_lte?: Maybe<Scalars["Float"]>;
  readonly periodInterestRate_gt?: Maybe<Scalars["Float"]>;
  readonly periodInterestRate_gte?: Maybe<Scalars["Float"]>;
  readonly periods?: Maybe<Scalars["Int"]>;
  readonly periods_not?: Maybe<Scalars["Int"]>;
  readonly periods_in?: Maybe<ReadonlyArray<Scalars["Int"]>>;
  readonly periods_not_in?: Maybe<ReadonlyArray<Scalars["Int"]>>;
  readonly periods_lt?: Maybe<Scalars["Int"]>;
  readonly periods_lte?: Maybe<Scalars["Int"]>;
  readonly periods_gt?: Maybe<Scalars["Int"]>;
  readonly periods_gte?: Maybe<Scalars["Int"]>;
  readonly periodType?: Maybe<PeriodType>;
  readonly periodType_not?: Maybe<PeriodType>;
  readonly periodType_in?: Maybe<ReadonlyArray<PeriodType>>;
  readonly periodType_not_in?: Maybe<ReadonlyArray<PeriodType>>;
  readonly startDate?: Maybe<Scalars["DateTime"]>;
  readonly startDate_not?: Maybe<Scalars["DateTime"]>;
  readonly startDate_in?: Maybe<ReadonlyArray<Scalars["DateTime"]>>;
  readonly startDate_not_in?: Maybe<ReadonlyArray<Scalars["DateTime"]>>;
  readonly startDate_lt?: Maybe<Scalars["DateTime"]>;
  readonly startDate_lte?: Maybe<Scalars["DateTime"]>;
  readonly startDate_gt?: Maybe<Scalars["DateTime"]>;
  readonly startDate_gte?: Maybe<Scalars["DateTime"]>;
  readonly payments_every?: Maybe<PaymentWhereInput>;
  readonly payments_some?: Maybe<PaymentWhereInput>;
  readonly payments_none?: Maybe<PaymentWhereInput>;
  readonly scenarios_every?: Maybe<ScenarioWhereInput>;
  readonly scenarios_some?: Maybe<ScenarioWhereInput>;
  readonly scenarios_none?: Maybe<ScenarioWhereInput>;
};

export type LoanWhereUniqueInput = {
  readonly id?: Maybe<Scalars["ID"]>;
};

export type Mutation = {
  readonly __typename?: "Mutation";
  readonly createLoan: Loan;
  readonly createPayment: Payment;
  readonly createScenario: Scenario;
  readonly createScenarioPayment: ScenarioPayment;
  readonly updateLoan?: Maybe<Loan>;
  readonly updatePayment?: Maybe<Payment>;
  readonly updateScenario?: Maybe<Scenario>;
  readonly updateScenarioPayment?: Maybe<ScenarioPayment>;
  readonly deleteLoan?: Maybe<Loan>;
  readonly deletePayment?: Maybe<Payment>;
  readonly deleteScenario?: Maybe<Scenario>;
  readonly deleteScenarioPayment?: Maybe<ScenarioPayment>;
  readonly upsertLoan: Loan;
  readonly upsertPayment: Payment;
  readonly upsertScenario: Scenario;
  readonly upsertScenarioPayment: ScenarioPayment;
  readonly updateManyLoans: BatchPayload;
  readonly updateManyPayments: BatchPayload;
  readonly updateManyScenarios: BatchPayload;
  readonly updateManyScenarioPayments: BatchPayload;
  readonly deleteManyLoans: BatchPayload;
  readonly deleteManyPayments: BatchPayload;
  readonly deleteManyScenarios: BatchPayload;
  readonly deleteManyScenarioPayments: BatchPayload;
};

export type MutationCreateLoanArgs = {
  data: LoanCreateInput;
};

export type MutationCreatePaymentArgs = {
  data: PaymentCreateInput;
};

export type MutationCreateScenarioArgs = {
  data: ScenarioCreateInput;
};

export type MutationCreateScenarioPaymentArgs = {
  data: ScenarioPaymentCreateInput;
};

export type MutationUpdateLoanArgs = {
  data: LoanUpdateInput;
  where: LoanWhereUniqueInput;
};

export type MutationUpdatePaymentArgs = {
  data: PaymentUpdateInput;
  where: PaymentWhereUniqueInput;
};

export type MutationUpdateScenarioArgs = {
  data: ScenarioUpdateInput;
  where: ScenarioWhereUniqueInput;
};

export type MutationUpdateScenarioPaymentArgs = {
  data: ScenarioPaymentUpdateInput;
  where: ScenarioPaymentWhereUniqueInput;
};

export type MutationDeleteLoanArgs = {
  where: LoanWhereUniqueInput;
};

export type MutationDeletePaymentArgs = {
  where: PaymentWhereUniqueInput;
};

export type MutationDeleteScenarioArgs = {
  where: ScenarioWhereUniqueInput;
};

export type MutationDeleteScenarioPaymentArgs = {
  where: ScenarioPaymentWhereUniqueInput;
};

export type MutationUpsertLoanArgs = {
  where: LoanWhereUniqueInput;
  create: LoanCreateInput;
  update: LoanUpdateInput;
};

export type MutationUpsertPaymentArgs = {
  where: PaymentWhereUniqueInput;
  create: PaymentCreateInput;
  update: PaymentUpdateInput;
};

export type MutationUpsertScenarioArgs = {
  where: ScenarioWhereUniqueInput;
  create: ScenarioCreateInput;
  update: ScenarioUpdateInput;
};

export type MutationUpsertScenarioPaymentArgs = {
  where: ScenarioPaymentWhereUniqueInput;
  create: ScenarioPaymentCreateInput;
  update: ScenarioPaymentUpdateInput;
};

export type MutationUpdateManyLoansArgs = {
  data: LoanUpdateManyMutationInput;
  where?: Maybe<LoanWhereInput>;
};

export type MutationUpdateManyPaymentsArgs = {
  data: PaymentUpdateManyMutationInput;
  where?: Maybe<PaymentWhereInput>;
};

export type MutationUpdateManyScenariosArgs = {
  data: ScenarioUpdateManyMutationInput;
  where?: Maybe<ScenarioWhereInput>;
};

export type MutationUpdateManyScenarioPaymentsArgs = {
  data: ScenarioPaymentUpdateManyMutationInput;
  where?: Maybe<ScenarioPaymentWhereInput>;
};

export type MutationDeleteManyLoansArgs = {
  where?: Maybe<LoanWhereInput>;
};

export type MutationDeleteManyPaymentsArgs = {
  where?: Maybe<PaymentWhereInput>;
};

export type MutationDeleteManyScenariosArgs = {
  where?: Maybe<ScenarioWhereInput>;
};

export type MutationDeleteManyScenarioPaymentsArgs = {
  where?: Maybe<ScenarioPaymentWhereInput>;
};

export enum MutationType {
  Created = "CREATED",
  Updated = "UPDATED",
  Deleted = "DELETED",
}

export type Node = {
  readonly id: Scalars["ID"];
};

export type PageInfo = {
  readonly __typename?: "PageInfo";
  readonly hasNextPage: Scalars["Boolean"];
  readonly hasPreviousPage: Scalars["Boolean"];
  readonly startCursor?: Maybe<Scalars["String"]>;
  readonly endCursor?: Maybe<Scalars["String"]>;
};

export type Payment = Node & {
  readonly __typename?: "Payment";
  readonly date: Scalars["DateTime"];
  readonly id: Scalars["ID"];
  readonly interest: Scalars["Float"];
  readonly loan: Loan;
  readonly note: Scalars["String"];
  readonly principal: Scalars["Float"];
};

export type PaymentConnection = {
  readonly __typename?: "PaymentConnection";
  readonly pageInfo: PageInfo;
  readonly edges: ReadonlyArray<Maybe<PaymentEdge>>;
  readonly aggregate: AggregatePayment;
};

export type PaymentCreateInput = {
  readonly date: Scalars["DateTime"];
  readonly id?: Maybe<Scalars["ID"]>;
  readonly interest: Scalars["Float"];
  readonly note?: Maybe<Scalars["String"]>;
  readonly principal: Scalars["Float"];
  readonly loan: LoanCreateOneWithoutPaymentsInput;
};

export type PaymentCreateManyWithoutLoanInput = {
  readonly create?: Maybe<ReadonlyArray<PaymentCreateWithoutLoanInput>>;
  readonly connect?: Maybe<ReadonlyArray<PaymentWhereUniqueInput>>;
};

export type PaymentCreateWithoutLoanInput = {
  readonly date: Scalars["DateTime"];
  readonly id?: Maybe<Scalars["ID"]>;
  readonly interest: Scalars["Float"];
  readonly note?: Maybe<Scalars["String"]>;
  readonly principal: Scalars["Float"];
};

export type PaymentEdge = {
  readonly __typename?: "PaymentEdge";
  readonly node: Payment;
  readonly cursor: Scalars["String"];
};

export enum PaymentOrderByInput {
  DateAsc = "date_ASC",
  DateDesc = "date_DESC",
  IdAsc = "id_ASC",
  IdDesc = "id_DESC",
  InterestAsc = "interest_ASC",
  InterestDesc = "interest_DESC",
  NoteAsc = "note_ASC",
  NoteDesc = "note_DESC",
  PrincipalAsc = "principal_ASC",
  PrincipalDesc = "principal_DESC",
}

export type PaymentPreviousValues = {
  readonly __typename?: "PaymentPreviousValues";
  readonly date: Scalars["DateTime"];
  readonly id: Scalars["ID"];
  readonly interest: Scalars["Float"];
  readonly note: Scalars["String"];
  readonly principal: Scalars["Float"];
};

export type PaymentScalarWhereInput = {
  readonly AND?: Maybe<ReadonlyArray<PaymentScalarWhereInput>>;
  readonly OR?: Maybe<ReadonlyArray<PaymentScalarWhereInput>>;
  readonly NOT?: Maybe<ReadonlyArray<PaymentScalarWhereInput>>;
  readonly date?: Maybe<Scalars["DateTime"]>;
  readonly date_not?: Maybe<Scalars["DateTime"]>;
  readonly date_in?: Maybe<ReadonlyArray<Scalars["DateTime"]>>;
  readonly date_not_in?: Maybe<ReadonlyArray<Scalars["DateTime"]>>;
  readonly date_lt?: Maybe<Scalars["DateTime"]>;
  readonly date_lte?: Maybe<Scalars["DateTime"]>;
  readonly date_gt?: Maybe<Scalars["DateTime"]>;
  readonly date_gte?: Maybe<Scalars["DateTime"]>;
  readonly id?: Maybe<Scalars["ID"]>;
  readonly id_not?: Maybe<Scalars["ID"]>;
  readonly id_in?: Maybe<ReadonlyArray<Scalars["ID"]>>;
  readonly id_not_in?: Maybe<ReadonlyArray<Scalars["ID"]>>;
  readonly id_lt?: Maybe<Scalars["ID"]>;
  readonly id_lte?: Maybe<Scalars["ID"]>;
  readonly id_gt?: Maybe<Scalars["ID"]>;
  readonly id_gte?: Maybe<Scalars["ID"]>;
  readonly id_contains?: Maybe<Scalars["ID"]>;
  readonly id_not_contains?: Maybe<Scalars["ID"]>;
  readonly id_starts_with?: Maybe<Scalars["ID"]>;
  readonly id_not_starts_with?: Maybe<Scalars["ID"]>;
  readonly id_ends_with?: Maybe<Scalars["ID"]>;
  readonly id_not_ends_with?: Maybe<Scalars["ID"]>;
  readonly interest?: Maybe<Scalars["Float"]>;
  readonly interest_not?: Maybe<Scalars["Float"]>;
  readonly interest_in?: Maybe<ReadonlyArray<Scalars["Float"]>>;
  readonly interest_not_in?: Maybe<ReadonlyArray<Scalars["Float"]>>;
  readonly interest_lt?: Maybe<Scalars["Float"]>;
  readonly interest_lte?: Maybe<Scalars["Float"]>;
  readonly interest_gt?: Maybe<Scalars["Float"]>;
  readonly interest_gte?: Maybe<Scalars["Float"]>;
  readonly note?: Maybe<Scalars["String"]>;
  readonly note_not?: Maybe<Scalars["String"]>;
  readonly note_in?: Maybe<ReadonlyArray<Scalars["String"]>>;
  readonly note_not_in?: Maybe<ReadonlyArray<Scalars["String"]>>;
  readonly note_lt?: Maybe<Scalars["String"]>;
  readonly note_lte?: Maybe<Scalars["String"]>;
  readonly note_gt?: Maybe<Scalars["String"]>;
  readonly note_gte?: Maybe<Scalars["String"]>;
  readonly note_contains?: Maybe<Scalars["String"]>;
  readonly note_not_contains?: Maybe<Scalars["String"]>;
  readonly note_starts_with?: Maybe<Scalars["String"]>;
  readonly note_not_starts_with?: Maybe<Scalars["String"]>;
  readonly note_ends_with?: Maybe<Scalars["String"]>;
  readonly note_not_ends_with?: Maybe<Scalars["String"]>;
  readonly principal?: Maybe<Scalars["Float"]>;
  readonly principal_not?: Maybe<Scalars["Float"]>;
  readonly principal_in?: Maybe<ReadonlyArray<Scalars["Float"]>>;
  readonly principal_not_in?: Maybe<ReadonlyArray<Scalars["Float"]>>;
  readonly principal_lt?: Maybe<Scalars["Float"]>;
  readonly principal_lte?: Maybe<Scalars["Float"]>;
  readonly principal_gt?: Maybe<Scalars["Float"]>;
  readonly principal_gte?: Maybe<Scalars["Float"]>;
};

export type PaymentSubscriptionPayload = {
  readonly __typename?: "PaymentSubscriptionPayload";
  readonly mutation: MutationType;
  readonly node?: Maybe<Payment>;
  readonly updatedFields?: Maybe<ReadonlyArray<Scalars["String"]>>;
  readonly previousValues?: Maybe<PaymentPreviousValues>;
};

export type PaymentSubscriptionWhereInput = {
  readonly AND?: Maybe<ReadonlyArray<PaymentSubscriptionWhereInput>>;
  readonly OR?: Maybe<ReadonlyArray<PaymentSubscriptionWhereInput>>;
  readonly NOT?: Maybe<ReadonlyArray<PaymentSubscriptionWhereInput>>;
  readonly mutation_in?: Maybe<ReadonlyArray<MutationType>>;
  readonly updatedFields_contains?: Maybe<Scalars["String"]>;
  readonly updatedFields_contains_every?: Maybe<ReadonlyArray<Scalars["String"]>>;
  readonly updatedFields_contains_some?: Maybe<ReadonlyArray<Scalars["String"]>>;
  readonly node?: Maybe<PaymentWhereInput>;
};

export type PaymentUpdateInput = {
  readonly date?: Maybe<Scalars["DateTime"]>;
  readonly interest?: Maybe<Scalars["Float"]>;
  readonly note?: Maybe<Scalars["String"]>;
  readonly principal?: Maybe<Scalars["Float"]>;
  readonly loan?: Maybe<LoanUpdateOneRequiredWithoutPaymentsInput>;
};

export type PaymentUpdateManyDataInput = {
  readonly date?: Maybe<Scalars["DateTime"]>;
  readonly interest?: Maybe<Scalars["Float"]>;
  readonly note?: Maybe<Scalars["String"]>;
  readonly principal?: Maybe<Scalars["Float"]>;
};

export type PaymentUpdateManyMutationInput = {
  readonly date?: Maybe<Scalars["DateTime"]>;
  readonly interest?: Maybe<Scalars["Float"]>;
  readonly note?: Maybe<Scalars["String"]>;
  readonly principal?: Maybe<Scalars["Float"]>;
};

export type PaymentUpdateManyWithoutLoanInput = {
  readonly create?: Maybe<ReadonlyArray<PaymentCreateWithoutLoanInput>>;
  readonly connect?: Maybe<ReadonlyArray<PaymentWhereUniqueInput>>;
  readonly set?: Maybe<ReadonlyArray<PaymentWhereUniqueInput>>;
  readonly disconnect?: Maybe<ReadonlyArray<PaymentWhereUniqueInput>>;
  readonly delete?: Maybe<ReadonlyArray<PaymentWhereUniqueInput>>;
  readonly update?: Maybe<ReadonlyArray<PaymentUpdateWithWhereUniqueWithoutLoanInput>>;
  readonly updateMany?: Maybe<ReadonlyArray<PaymentUpdateManyWithWhereNestedInput>>;
  readonly deleteMany?: Maybe<ReadonlyArray<PaymentScalarWhereInput>>;
  readonly upsert?: Maybe<ReadonlyArray<PaymentUpsertWithWhereUniqueWithoutLoanInput>>;
};

export type PaymentUpdateManyWithWhereNestedInput = {
  readonly where: PaymentScalarWhereInput;
  readonly data: PaymentUpdateManyDataInput;
};

export type PaymentUpdateWithoutLoanDataInput = {
  readonly date?: Maybe<Scalars["DateTime"]>;
  readonly interest?: Maybe<Scalars["Float"]>;
  readonly note?: Maybe<Scalars["String"]>;
  readonly principal?: Maybe<Scalars["Float"]>;
};

export type PaymentUpdateWithWhereUniqueWithoutLoanInput = {
  readonly where: PaymentWhereUniqueInput;
  readonly data: PaymentUpdateWithoutLoanDataInput;
};

export type PaymentUpsertWithWhereUniqueWithoutLoanInput = {
  readonly where: PaymentWhereUniqueInput;
  readonly update: PaymentUpdateWithoutLoanDataInput;
  readonly create: PaymentCreateWithoutLoanInput;
};

export type PaymentWhereInput = {
  readonly AND?: Maybe<ReadonlyArray<PaymentWhereInput>>;
  readonly OR?: Maybe<ReadonlyArray<PaymentWhereInput>>;
  readonly NOT?: Maybe<ReadonlyArray<PaymentWhereInput>>;
  readonly date?: Maybe<Scalars["DateTime"]>;
  readonly date_not?: Maybe<Scalars["DateTime"]>;
  readonly date_in?: Maybe<ReadonlyArray<Scalars["DateTime"]>>;
  readonly date_not_in?: Maybe<ReadonlyArray<Scalars["DateTime"]>>;
  readonly date_lt?: Maybe<Scalars["DateTime"]>;
  readonly date_lte?: Maybe<Scalars["DateTime"]>;
  readonly date_gt?: Maybe<Scalars["DateTime"]>;
  readonly date_gte?: Maybe<Scalars["DateTime"]>;
  readonly id?: Maybe<Scalars["ID"]>;
  readonly id_not?: Maybe<Scalars["ID"]>;
  readonly id_in?: Maybe<ReadonlyArray<Scalars["ID"]>>;
  readonly id_not_in?: Maybe<ReadonlyArray<Scalars["ID"]>>;
  readonly id_lt?: Maybe<Scalars["ID"]>;
  readonly id_lte?: Maybe<Scalars["ID"]>;
  readonly id_gt?: Maybe<Scalars["ID"]>;
  readonly id_gte?: Maybe<Scalars["ID"]>;
  readonly id_contains?: Maybe<Scalars["ID"]>;
  readonly id_not_contains?: Maybe<Scalars["ID"]>;
  readonly id_starts_with?: Maybe<Scalars["ID"]>;
  readonly id_not_starts_with?: Maybe<Scalars["ID"]>;
  readonly id_ends_with?: Maybe<Scalars["ID"]>;
  readonly id_not_ends_with?: Maybe<Scalars["ID"]>;
  readonly interest?: Maybe<Scalars["Float"]>;
  readonly interest_not?: Maybe<Scalars["Float"]>;
  readonly interest_in?: Maybe<ReadonlyArray<Scalars["Float"]>>;
  readonly interest_not_in?: Maybe<ReadonlyArray<Scalars["Float"]>>;
  readonly interest_lt?: Maybe<Scalars["Float"]>;
  readonly interest_lte?: Maybe<Scalars["Float"]>;
  readonly interest_gt?: Maybe<Scalars["Float"]>;
  readonly interest_gte?: Maybe<Scalars["Float"]>;
  readonly note?: Maybe<Scalars["String"]>;
  readonly note_not?: Maybe<Scalars["String"]>;
  readonly note_in?: Maybe<ReadonlyArray<Scalars["String"]>>;
  readonly note_not_in?: Maybe<ReadonlyArray<Scalars["String"]>>;
  readonly note_lt?: Maybe<Scalars["String"]>;
  readonly note_lte?: Maybe<Scalars["String"]>;
  readonly note_gt?: Maybe<Scalars["String"]>;
  readonly note_gte?: Maybe<Scalars["String"]>;
  readonly note_contains?: Maybe<Scalars["String"]>;
  readonly note_not_contains?: Maybe<Scalars["String"]>;
  readonly note_starts_with?: Maybe<Scalars["String"]>;
  readonly note_not_starts_with?: Maybe<Scalars["String"]>;
  readonly note_ends_with?: Maybe<Scalars["String"]>;
  readonly note_not_ends_with?: Maybe<Scalars["String"]>;
  readonly principal?: Maybe<Scalars["Float"]>;
  readonly principal_not?: Maybe<Scalars["Float"]>;
  readonly principal_in?: Maybe<ReadonlyArray<Scalars["Float"]>>;
  readonly principal_not_in?: Maybe<ReadonlyArray<Scalars["Float"]>>;
  readonly principal_lt?: Maybe<Scalars["Float"]>;
  readonly principal_lte?: Maybe<Scalars["Float"]>;
  readonly principal_gt?: Maybe<Scalars["Float"]>;
  readonly principal_gte?: Maybe<Scalars["Float"]>;
  readonly loan?: Maybe<LoanWhereInput>;
};

export type PaymentWhereUniqueInput = {
  readonly id?: Maybe<Scalars["ID"]>;
};

export enum PeriodType {
  Monthly = "Monthly",
  Yearly = "Yearly",
}

export type Query = {
  readonly __typename?: "Query";
  readonly loans: ReadonlyArray<Maybe<Loan>>;
  readonly payments: ReadonlyArray<Maybe<Payment>>;
  readonly scenarios: ReadonlyArray<Maybe<Scenario>>;
  readonly scenarioPayments: ReadonlyArray<Maybe<ScenarioPayment>>;
  readonly loan?: Maybe<Loan>;
  readonly payment?: Maybe<Payment>;
  readonly scenario?: Maybe<Scenario>;
  readonly scenarioPayment?: Maybe<ScenarioPayment>;
  readonly loansConnection: LoanConnection;
  readonly paymentsConnection: PaymentConnection;
  readonly scenariosConnection: ScenarioConnection;
  readonly scenarioPaymentsConnection: ScenarioPaymentConnection;
  readonly node?: Maybe<Node>;
};

export type QueryLoansArgs = {
  where?: Maybe<LoanWhereInput>;
  orderBy?: Maybe<LoanOrderByInput>;
  skip?: Maybe<Scalars["Int"]>;
  after?: Maybe<Scalars["String"]>;
  before?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Int"]>;
  last?: Maybe<Scalars["Int"]>;
};

export type QueryPaymentsArgs = {
  where?: Maybe<PaymentWhereInput>;
  orderBy?: Maybe<PaymentOrderByInput>;
  skip?: Maybe<Scalars["Int"]>;
  after?: Maybe<Scalars["String"]>;
  before?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Int"]>;
  last?: Maybe<Scalars["Int"]>;
};

export type QueryScenariosArgs = {
  where?: Maybe<ScenarioWhereInput>;
  orderBy?: Maybe<ScenarioOrderByInput>;
  skip?: Maybe<Scalars["Int"]>;
  after?: Maybe<Scalars["String"]>;
  before?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Int"]>;
  last?: Maybe<Scalars["Int"]>;
};

export type QueryScenarioPaymentsArgs = {
  where?: Maybe<ScenarioPaymentWhereInput>;
  orderBy?: Maybe<ScenarioPaymentOrderByInput>;
  skip?: Maybe<Scalars["Int"]>;
  after?: Maybe<Scalars["String"]>;
  before?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Int"]>;
  last?: Maybe<Scalars["Int"]>;
};

export type QueryLoanArgs = {
  where: LoanWhereUniqueInput;
};

export type QueryPaymentArgs = {
  where: PaymentWhereUniqueInput;
};

export type QueryScenarioArgs = {
  where: ScenarioWhereUniqueInput;
};

export type QueryScenarioPaymentArgs = {
  where: ScenarioPaymentWhereUniqueInput;
};

export type QueryLoansConnectionArgs = {
  where?: Maybe<LoanWhereInput>;
  orderBy?: Maybe<LoanOrderByInput>;
  skip?: Maybe<Scalars["Int"]>;
  after?: Maybe<Scalars["String"]>;
  before?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Int"]>;
  last?: Maybe<Scalars["Int"]>;
};

export type QueryPaymentsConnectionArgs = {
  where?: Maybe<PaymentWhereInput>;
  orderBy?: Maybe<PaymentOrderByInput>;
  skip?: Maybe<Scalars["Int"]>;
  after?: Maybe<Scalars["String"]>;
  before?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Int"]>;
  last?: Maybe<Scalars["Int"]>;
};

export type QueryScenariosConnectionArgs = {
  where?: Maybe<ScenarioWhereInput>;
  orderBy?: Maybe<ScenarioOrderByInput>;
  skip?: Maybe<Scalars["Int"]>;
  after?: Maybe<Scalars["String"]>;
  before?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Int"]>;
  last?: Maybe<Scalars["Int"]>;
};

export type QueryScenarioPaymentsConnectionArgs = {
  where?: Maybe<ScenarioPaymentWhereInput>;
  orderBy?: Maybe<ScenarioPaymentOrderByInput>;
  skip?: Maybe<Scalars["Int"]>;
  after?: Maybe<Scalars["String"]>;
  before?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Int"]>;
  last?: Maybe<Scalars["Int"]>;
};

export type QueryNodeArgs = {
  id: Scalars["ID"];
};

export type Scenario = Node & {
  readonly __typename?: "Scenario";
  readonly additionalPayments?: Maybe<ReadonlyArray<ScenarioPayment>>;
  readonly id: Scalars["ID"];
  readonly loan: Loan;
  readonly name: Scalars["String"];
};

export type ScenarioAdditionalPaymentsArgs = {
  where?: Maybe<ScenarioPaymentWhereInput>;
  orderBy?: Maybe<ScenarioPaymentOrderByInput>;
  skip?: Maybe<Scalars["Int"]>;
  after?: Maybe<Scalars["String"]>;
  before?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Int"]>;
  last?: Maybe<Scalars["Int"]>;
};

export type ScenarioConnection = {
  readonly __typename?: "ScenarioConnection";
  readonly pageInfo: PageInfo;
  readonly edges: ReadonlyArray<Maybe<ScenarioEdge>>;
  readonly aggregate: AggregateScenario;
};

export type ScenarioCreateInput = {
  readonly id?: Maybe<Scalars["ID"]>;
  readonly name: Scalars["String"];
  readonly additionalPayments?: Maybe<ScenarioPaymentCreateManyWithoutScenarioInput>;
  readonly loan: LoanCreateOneWithoutScenariosInput;
};

export type ScenarioCreateManyWithoutLoanInput = {
  readonly create?: Maybe<ReadonlyArray<ScenarioCreateWithoutLoanInput>>;
  readonly connect?: Maybe<ReadonlyArray<ScenarioWhereUniqueInput>>;
};

export type ScenarioCreateOneWithoutAdditionalPaymentsInput = {
  readonly create?: Maybe<ScenarioCreateWithoutAdditionalPaymentsInput>;
  readonly connect?: Maybe<ScenarioWhereUniqueInput>;
};

export type ScenarioCreateWithoutAdditionalPaymentsInput = {
  readonly id?: Maybe<Scalars["ID"]>;
  readonly name: Scalars["String"];
  readonly loan: LoanCreateOneWithoutScenariosInput;
};

export type ScenarioCreateWithoutLoanInput = {
  readonly id?: Maybe<Scalars["ID"]>;
  readonly name: Scalars["String"];
  readonly additionalPayments?: Maybe<ScenarioPaymentCreateManyWithoutScenarioInput>;
};

export type ScenarioEdge = {
  readonly __typename?: "ScenarioEdge";
  readonly node: Scenario;
  readonly cursor: Scalars["String"];
};

export enum ScenarioOrderByInput {
  IdAsc = "id_ASC",
  IdDesc = "id_DESC",
  NameAsc = "name_ASC",
  NameDesc = "name_DESC",
}

export type ScenarioPayment = Node & {
  readonly __typename?: "ScenarioPayment";
  readonly from: Scalars["DateTime"];
  readonly id: Scalars["ID"];
  readonly principalAmount: Scalars["Float"];
  readonly scenario: Scenario;
  readonly to?: Maybe<Scalars["DateTime"]>;
};

export type ScenarioPaymentConnection = {
  readonly __typename?: "ScenarioPaymentConnection";
  readonly pageInfo: PageInfo;
  readonly edges: ReadonlyArray<Maybe<ScenarioPaymentEdge>>;
  readonly aggregate: AggregateScenarioPayment;
};

export type ScenarioPaymentCreateInput = {
  readonly from: Scalars["DateTime"];
  readonly id?: Maybe<Scalars["ID"]>;
  readonly principalAmount: Scalars["Float"];
  readonly to?: Maybe<Scalars["DateTime"]>;
  readonly scenario: ScenarioCreateOneWithoutAdditionalPaymentsInput;
};

export type ScenarioPaymentCreateManyWithoutScenarioInput = {
  readonly create?: Maybe<ReadonlyArray<ScenarioPaymentCreateWithoutScenarioInput>>;
  readonly connect?: Maybe<ReadonlyArray<ScenarioPaymentWhereUniqueInput>>;
};

export type ScenarioPaymentCreateWithoutScenarioInput = {
  readonly from: Scalars["DateTime"];
  readonly id?: Maybe<Scalars["ID"]>;
  readonly principalAmount: Scalars["Float"];
  readonly to?: Maybe<Scalars["DateTime"]>;
};

export type ScenarioPaymentEdge = {
  readonly __typename?: "ScenarioPaymentEdge";
  readonly node: ScenarioPayment;
  readonly cursor: Scalars["String"];
};

export enum ScenarioPaymentOrderByInput {
  FromAsc = "from_ASC",
  FromDesc = "from_DESC",
  IdAsc = "id_ASC",
  IdDesc = "id_DESC",
  PrincipalAmountAsc = "principalAmount_ASC",
  PrincipalAmountDesc = "principalAmount_DESC",
  ToAsc = "to_ASC",
  ToDesc = "to_DESC",
}

export type ScenarioPaymentPreviousValues = {
  readonly __typename?: "ScenarioPaymentPreviousValues";
  readonly from: Scalars["DateTime"];
  readonly id: Scalars["ID"];
  readonly principalAmount: Scalars["Float"];
  readonly to?: Maybe<Scalars["DateTime"]>;
};

export type ScenarioPaymentScalarWhereInput = {
  readonly AND?: Maybe<ReadonlyArray<ScenarioPaymentScalarWhereInput>>;
  readonly OR?: Maybe<ReadonlyArray<ScenarioPaymentScalarWhereInput>>;
  readonly NOT?: Maybe<ReadonlyArray<ScenarioPaymentScalarWhereInput>>;
  readonly from?: Maybe<Scalars["DateTime"]>;
  readonly from_not?: Maybe<Scalars["DateTime"]>;
  readonly from_in?: Maybe<ReadonlyArray<Scalars["DateTime"]>>;
  readonly from_not_in?: Maybe<ReadonlyArray<Scalars["DateTime"]>>;
  readonly from_lt?: Maybe<Scalars["DateTime"]>;
  readonly from_lte?: Maybe<Scalars["DateTime"]>;
  readonly from_gt?: Maybe<Scalars["DateTime"]>;
  readonly from_gte?: Maybe<Scalars["DateTime"]>;
  readonly id?: Maybe<Scalars["ID"]>;
  readonly id_not?: Maybe<Scalars["ID"]>;
  readonly id_in?: Maybe<ReadonlyArray<Scalars["ID"]>>;
  readonly id_not_in?: Maybe<ReadonlyArray<Scalars["ID"]>>;
  readonly id_lt?: Maybe<Scalars["ID"]>;
  readonly id_lte?: Maybe<Scalars["ID"]>;
  readonly id_gt?: Maybe<Scalars["ID"]>;
  readonly id_gte?: Maybe<Scalars["ID"]>;
  readonly id_contains?: Maybe<Scalars["ID"]>;
  readonly id_not_contains?: Maybe<Scalars["ID"]>;
  readonly id_starts_with?: Maybe<Scalars["ID"]>;
  readonly id_not_starts_with?: Maybe<Scalars["ID"]>;
  readonly id_ends_with?: Maybe<Scalars["ID"]>;
  readonly id_not_ends_with?: Maybe<Scalars["ID"]>;
  readonly principalAmount?: Maybe<Scalars["Float"]>;
  readonly principalAmount_not?: Maybe<Scalars["Float"]>;
  readonly principalAmount_in?: Maybe<ReadonlyArray<Scalars["Float"]>>;
  readonly principalAmount_not_in?: Maybe<ReadonlyArray<Scalars["Float"]>>;
  readonly principalAmount_lt?: Maybe<Scalars["Float"]>;
  readonly principalAmount_lte?: Maybe<Scalars["Float"]>;
  readonly principalAmount_gt?: Maybe<Scalars["Float"]>;
  readonly principalAmount_gte?: Maybe<Scalars["Float"]>;
  readonly to?: Maybe<Scalars["DateTime"]>;
  readonly to_not?: Maybe<Scalars["DateTime"]>;
  readonly to_in?: Maybe<ReadonlyArray<Scalars["DateTime"]>>;
  readonly to_not_in?: Maybe<ReadonlyArray<Scalars["DateTime"]>>;
  readonly to_lt?: Maybe<Scalars["DateTime"]>;
  readonly to_lte?: Maybe<Scalars["DateTime"]>;
  readonly to_gt?: Maybe<Scalars["DateTime"]>;
  readonly to_gte?: Maybe<Scalars["DateTime"]>;
};

export type ScenarioPaymentSubscriptionPayload = {
  readonly __typename?: "ScenarioPaymentSubscriptionPayload";
  readonly mutation: MutationType;
  readonly node?: Maybe<ScenarioPayment>;
  readonly updatedFields?: Maybe<ReadonlyArray<Scalars["String"]>>;
  readonly previousValues?: Maybe<ScenarioPaymentPreviousValues>;
};

export type ScenarioPaymentSubscriptionWhereInput = {
  readonly AND?: Maybe<ReadonlyArray<ScenarioPaymentSubscriptionWhereInput>>;
  readonly OR?: Maybe<ReadonlyArray<ScenarioPaymentSubscriptionWhereInput>>;
  readonly NOT?: Maybe<ReadonlyArray<ScenarioPaymentSubscriptionWhereInput>>;
  readonly mutation_in?: Maybe<ReadonlyArray<MutationType>>;
  readonly updatedFields_contains?: Maybe<Scalars["String"]>;
  readonly updatedFields_contains_every?: Maybe<ReadonlyArray<Scalars["String"]>>;
  readonly updatedFields_contains_some?: Maybe<ReadonlyArray<Scalars["String"]>>;
  readonly node?: Maybe<ScenarioPaymentWhereInput>;
};

export type ScenarioPaymentUpdateInput = {
  readonly from?: Maybe<Scalars["DateTime"]>;
  readonly principalAmount?: Maybe<Scalars["Float"]>;
  readonly to?: Maybe<Scalars["DateTime"]>;
  readonly scenario?: Maybe<ScenarioUpdateOneRequiredWithoutAdditionalPaymentsInput>;
};

export type ScenarioPaymentUpdateManyDataInput = {
  readonly from?: Maybe<Scalars["DateTime"]>;
  readonly principalAmount?: Maybe<Scalars["Float"]>;
  readonly to?: Maybe<Scalars["DateTime"]>;
};

export type ScenarioPaymentUpdateManyMutationInput = {
  readonly from?: Maybe<Scalars["DateTime"]>;
  readonly principalAmount?: Maybe<Scalars["Float"]>;
  readonly to?: Maybe<Scalars["DateTime"]>;
};

export type ScenarioPaymentUpdateManyWithoutScenarioInput = {
  readonly create?: Maybe<ReadonlyArray<ScenarioPaymentCreateWithoutScenarioInput>>;
  readonly connect?: Maybe<ReadonlyArray<ScenarioPaymentWhereUniqueInput>>;
  readonly set?: Maybe<ReadonlyArray<ScenarioPaymentWhereUniqueInput>>;
  readonly disconnect?: Maybe<ReadonlyArray<ScenarioPaymentWhereUniqueInput>>;
  readonly delete?: Maybe<ReadonlyArray<ScenarioPaymentWhereUniqueInput>>;
  readonly update?: Maybe<ReadonlyArray<ScenarioPaymentUpdateWithWhereUniqueWithoutScenarioInput>>;
  readonly updateMany?: Maybe<ReadonlyArray<ScenarioPaymentUpdateManyWithWhereNestedInput>>;
  readonly deleteMany?: Maybe<ReadonlyArray<ScenarioPaymentScalarWhereInput>>;
  readonly upsert?: Maybe<ReadonlyArray<ScenarioPaymentUpsertWithWhereUniqueWithoutScenarioInput>>;
};

export type ScenarioPaymentUpdateManyWithWhereNestedInput = {
  readonly where: ScenarioPaymentScalarWhereInput;
  readonly data: ScenarioPaymentUpdateManyDataInput;
};

export type ScenarioPaymentUpdateWithoutScenarioDataInput = {
  readonly from?: Maybe<Scalars["DateTime"]>;
  readonly principalAmount?: Maybe<Scalars["Float"]>;
  readonly to?: Maybe<Scalars["DateTime"]>;
};

export type ScenarioPaymentUpdateWithWhereUniqueWithoutScenarioInput = {
  readonly where: ScenarioPaymentWhereUniqueInput;
  readonly data: ScenarioPaymentUpdateWithoutScenarioDataInput;
};

export type ScenarioPaymentUpsertWithWhereUniqueWithoutScenarioInput = {
  readonly where: ScenarioPaymentWhereUniqueInput;
  readonly update: ScenarioPaymentUpdateWithoutScenarioDataInput;
  readonly create: ScenarioPaymentCreateWithoutScenarioInput;
};

export type ScenarioPaymentWhereInput = {
  readonly AND?: Maybe<ReadonlyArray<ScenarioPaymentWhereInput>>;
  readonly OR?: Maybe<ReadonlyArray<ScenarioPaymentWhereInput>>;
  readonly NOT?: Maybe<ReadonlyArray<ScenarioPaymentWhereInput>>;
  readonly from?: Maybe<Scalars["DateTime"]>;
  readonly from_not?: Maybe<Scalars["DateTime"]>;
  readonly from_in?: Maybe<ReadonlyArray<Scalars["DateTime"]>>;
  readonly from_not_in?: Maybe<ReadonlyArray<Scalars["DateTime"]>>;
  readonly from_lt?: Maybe<Scalars["DateTime"]>;
  readonly from_lte?: Maybe<Scalars["DateTime"]>;
  readonly from_gt?: Maybe<Scalars["DateTime"]>;
  readonly from_gte?: Maybe<Scalars["DateTime"]>;
  readonly id?: Maybe<Scalars["ID"]>;
  readonly id_not?: Maybe<Scalars["ID"]>;
  readonly id_in?: Maybe<ReadonlyArray<Scalars["ID"]>>;
  readonly id_not_in?: Maybe<ReadonlyArray<Scalars["ID"]>>;
  readonly id_lt?: Maybe<Scalars["ID"]>;
  readonly id_lte?: Maybe<Scalars["ID"]>;
  readonly id_gt?: Maybe<Scalars["ID"]>;
  readonly id_gte?: Maybe<Scalars["ID"]>;
  readonly id_contains?: Maybe<Scalars["ID"]>;
  readonly id_not_contains?: Maybe<Scalars["ID"]>;
  readonly id_starts_with?: Maybe<Scalars["ID"]>;
  readonly id_not_starts_with?: Maybe<Scalars["ID"]>;
  readonly id_ends_with?: Maybe<Scalars["ID"]>;
  readonly id_not_ends_with?: Maybe<Scalars["ID"]>;
  readonly principalAmount?: Maybe<Scalars["Float"]>;
  readonly principalAmount_not?: Maybe<Scalars["Float"]>;
  readonly principalAmount_in?: Maybe<ReadonlyArray<Scalars["Float"]>>;
  readonly principalAmount_not_in?: Maybe<ReadonlyArray<Scalars["Float"]>>;
  readonly principalAmount_lt?: Maybe<Scalars["Float"]>;
  readonly principalAmount_lte?: Maybe<Scalars["Float"]>;
  readonly principalAmount_gt?: Maybe<Scalars["Float"]>;
  readonly principalAmount_gte?: Maybe<Scalars["Float"]>;
  readonly to?: Maybe<Scalars["DateTime"]>;
  readonly to_not?: Maybe<Scalars["DateTime"]>;
  readonly to_in?: Maybe<ReadonlyArray<Scalars["DateTime"]>>;
  readonly to_not_in?: Maybe<ReadonlyArray<Scalars["DateTime"]>>;
  readonly to_lt?: Maybe<Scalars["DateTime"]>;
  readonly to_lte?: Maybe<Scalars["DateTime"]>;
  readonly to_gt?: Maybe<Scalars["DateTime"]>;
  readonly to_gte?: Maybe<Scalars["DateTime"]>;
  readonly scenario?: Maybe<ScenarioWhereInput>;
};

export type ScenarioPaymentWhereUniqueInput = {
  readonly id?: Maybe<Scalars["ID"]>;
};

export type ScenarioPreviousValues = {
  readonly __typename?: "ScenarioPreviousValues";
  readonly id: Scalars["ID"];
  readonly name: Scalars["String"];
};

export type ScenarioScalarWhereInput = {
  readonly AND?: Maybe<ReadonlyArray<ScenarioScalarWhereInput>>;
  readonly OR?: Maybe<ReadonlyArray<ScenarioScalarWhereInput>>;
  readonly NOT?: Maybe<ReadonlyArray<ScenarioScalarWhereInput>>;
  readonly id?: Maybe<Scalars["ID"]>;
  readonly id_not?: Maybe<Scalars["ID"]>;
  readonly id_in?: Maybe<ReadonlyArray<Scalars["ID"]>>;
  readonly id_not_in?: Maybe<ReadonlyArray<Scalars["ID"]>>;
  readonly id_lt?: Maybe<Scalars["ID"]>;
  readonly id_lte?: Maybe<Scalars["ID"]>;
  readonly id_gt?: Maybe<Scalars["ID"]>;
  readonly id_gte?: Maybe<Scalars["ID"]>;
  readonly id_contains?: Maybe<Scalars["ID"]>;
  readonly id_not_contains?: Maybe<Scalars["ID"]>;
  readonly id_starts_with?: Maybe<Scalars["ID"]>;
  readonly id_not_starts_with?: Maybe<Scalars["ID"]>;
  readonly id_ends_with?: Maybe<Scalars["ID"]>;
  readonly id_not_ends_with?: Maybe<Scalars["ID"]>;
  readonly name?: Maybe<Scalars["String"]>;
  readonly name_not?: Maybe<Scalars["String"]>;
  readonly name_in?: Maybe<ReadonlyArray<Scalars["String"]>>;
  readonly name_not_in?: Maybe<ReadonlyArray<Scalars["String"]>>;
  readonly name_lt?: Maybe<Scalars["String"]>;
  readonly name_lte?: Maybe<Scalars["String"]>;
  readonly name_gt?: Maybe<Scalars["String"]>;
  readonly name_gte?: Maybe<Scalars["String"]>;
  readonly name_contains?: Maybe<Scalars["String"]>;
  readonly name_not_contains?: Maybe<Scalars["String"]>;
  readonly name_starts_with?: Maybe<Scalars["String"]>;
  readonly name_not_starts_with?: Maybe<Scalars["String"]>;
  readonly name_ends_with?: Maybe<Scalars["String"]>;
  readonly name_not_ends_with?: Maybe<Scalars["String"]>;
};

export type ScenarioSubscriptionPayload = {
  readonly __typename?: "ScenarioSubscriptionPayload";
  readonly mutation: MutationType;
  readonly node?: Maybe<Scenario>;
  readonly updatedFields?: Maybe<ReadonlyArray<Scalars["String"]>>;
  readonly previousValues?: Maybe<ScenarioPreviousValues>;
};

export type ScenarioSubscriptionWhereInput = {
  readonly AND?: Maybe<ReadonlyArray<ScenarioSubscriptionWhereInput>>;
  readonly OR?: Maybe<ReadonlyArray<ScenarioSubscriptionWhereInput>>;
  readonly NOT?: Maybe<ReadonlyArray<ScenarioSubscriptionWhereInput>>;
  readonly mutation_in?: Maybe<ReadonlyArray<MutationType>>;
  readonly updatedFields_contains?: Maybe<Scalars["String"]>;
  readonly updatedFields_contains_every?: Maybe<ReadonlyArray<Scalars["String"]>>;
  readonly updatedFields_contains_some?: Maybe<ReadonlyArray<Scalars["String"]>>;
  readonly node?: Maybe<ScenarioWhereInput>;
};

export type ScenarioUpdateInput = {
  readonly name?: Maybe<Scalars["String"]>;
  readonly additionalPayments?: Maybe<ScenarioPaymentUpdateManyWithoutScenarioInput>;
  readonly loan?: Maybe<LoanUpdateOneRequiredWithoutScenariosInput>;
};

export type ScenarioUpdateManyDataInput = {
  readonly name?: Maybe<Scalars["String"]>;
};

export type ScenarioUpdateManyMutationInput = {
  readonly name?: Maybe<Scalars["String"]>;
};

export type ScenarioUpdateManyWithoutLoanInput = {
  readonly create?: Maybe<ReadonlyArray<ScenarioCreateWithoutLoanInput>>;
  readonly connect?: Maybe<ReadonlyArray<ScenarioWhereUniqueInput>>;
  readonly set?: Maybe<ReadonlyArray<ScenarioWhereUniqueInput>>;
  readonly disconnect?: Maybe<ReadonlyArray<ScenarioWhereUniqueInput>>;
  readonly delete?: Maybe<ReadonlyArray<ScenarioWhereUniqueInput>>;
  readonly update?: Maybe<ReadonlyArray<ScenarioUpdateWithWhereUniqueWithoutLoanInput>>;
  readonly updateMany?: Maybe<ReadonlyArray<ScenarioUpdateManyWithWhereNestedInput>>;
  readonly deleteMany?: Maybe<ReadonlyArray<ScenarioScalarWhereInput>>;
  readonly upsert?: Maybe<ReadonlyArray<ScenarioUpsertWithWhereUniqueWithoutLoanInput>>;
};

export type ScenarioUpdateManyWithWhereNestedInput = {
  readonly where: ScenarioScalarWhereInput;
  readonly data: ScenarioUpdateManyDataInput;
};

export type ScenarioUpdateOneRequiredWithoutAdditionalPaymentsInput = {
  readonly create?: Maybe<ScenarioCreateWithoutAdditionalPaymentsInput>;
  readonly connect?: Maybe<ScenarioWhereUniqueInput>;
  readonly update?: Maybe<ScenarioUpdateWithoutAdditionalPaymentsDataInput>;
  readonly upsert?: Maybe<ScenarioUpsertWithoutAdditionalPaymentsInput>;
};

export type ScenarioUpdateWithoutAdditionalPaymentsDataInput = {
  readonly name?: Maybe<Scalars["String"]>;
  readonly loan?: Maybe<LoanUpdateOneRequiredWithoutScenariosInput>;
};

export type ScenarioUpdateWithoutLoanDataInput = {
  readonly name?: Maybe<Scalars["String"]>;
  readonly additionalPayments?: Maybe<ScenarioPaymentUpdateManyWithoutScenarioInput>;
};

export type ScenarioUpdateWithWhereUniqueWithoutLoanInput = {
  readonly where: ScenarioWhereUniqueInput;
  readonly data: ScenarioUpdateWithoutLoanDataInput;
};

export type ScenarioUpsertWithoutAdditionalPaymentsInput = {
  readonly update: ScenarioUpdateWithoutAdditionalPaymentsDataInput;
  readonly create: ScenarioCreateWithoutAdditionalPaymentsInput;
};

export type ScenarioUpsertWithWhereUniqueWithoutLoanInput = {
  readonly where: ScenarioWhereUniqueInput;
  readonly update: ScenarioUpdateWithoutLoanDataInput;
  readonly create: ScenarioCreateWithoutLoanInput;
};

export type ScenarioWhereInput = {
  readonly AND?: Maybe<ReadonlyArray<ScenarioWhereInput>>;
  readonly OR?: Maybe<ReadonlyArray<ScenarioWhereInput>>;
  readonly NOT?: Maybe<ReadonlyArray<ScenarioWhereInput>>;
  readonly id?: Maybe<Scalars["ID"]>;
  readonly id_not?: Maybe<Scalars["ID"]>;
  readonly id_in?: Maybe<ReadonlyArray<Scalars["ID"]>>;
  readonly id_not_in?: Maybe<ReadonlyArray<Scalars["ID"]>>;
  readonly id_lt?: Maybe<Scalars["ID"]>;
  readonly id_lte?: Maybe<Scalars["ID"]>;
  readonly id_gt?: Maybe<Scalars["ID"]>;
  readonly id_gte?: Maybe<Scalars["ID"]>;
  readonly id_contains?: Maybe<Scalars["ID"]>;
  readonly id_not_contains?: Maybe<Scalars["ID"]>;
  readonly id_starts_with?: Maybe<Scalars["ID"]>;
  readonly id_not_starts_with?: Maybe<Scalars["ID"]>;
  readonly id_ends_with?: Maybe<Scalars["ID"]>;
  readonly id_not_ends_with?: Maybe<Scalars["ID"]>;
  readonly name?: Maybe<Scalars["String"]>;
  readonly name_not?: Maybe<Scalars["String"]>;
  readonly name_in?: Maybe<ReadonlyArray<Scalars["String"]>>;
  readonly name_not_in?: Maybe<ReadonlyArray<Scalars["String"]>>;
  readonly name_lt?: Maybe<Scalars["String"]>;
  readonly name_lte?: Maybe<Scalars["String"]>;
  readonly name_gt?: Maybe<Scalars["String"]>;
  readonly name_gte?: Maybe<Scalars["String"]>;
  readonly name_contains?: Maybe<Scalars["String"]>;
  readonly name_not_contains?: Maybe<Scalars["String"]>;
  readonly name_starts_with?: Maybe<Scalars["String"]>;
  readonly name_not_starts_with?: Maybe<Scalars["String"]>;
  readonly name_ends_with?: Maybe<Scalars["String"]>;
  readonly name_not_ends_with?: Maybe<Scalars["String"]>;
  readonly additionalPayments_every?: Maybe<ScenarioPaymentWhereInput>;
  readonly additionalPayments_some?: Maybe<ScenarioPaymentWhereInput>;
  readonly additionalPayments_none?: Maybe<ScenarioPaymentWhereInput>;
  readonly loan?: Maybe<LoanWhereInput>;
};

export type ScenarioWhereUniqueInput = {
  readonly id?: Maybe<Scalars["ID"]>;
};

export type Subscription = {
  readonly __typename?: "Subscription";
  readonly loan?: Maybe<LoanSubscriptionPayload>;
  readonly payment?: Maybe<PaymentSubscriptionPayload>;
  readonly scenario?: Maybe<ScenarioSubscriptionPayload>;
  readonly scenarioPayment?: Maybe<ScenarioPaymentSubscriptionPayload>;
};

export type SubscriptionLoanArgs = {
  where?: Maybe<LoanSubscriptionWhereInput>;
};

export type SubscriptionPaymentArgs = {
  where?: Maybe<PaymentSubscriptionWhereInput>;
};

export type SubscriptionScenarioArgs = {
  where?: Maybe<ScenarioSubscriptionWhereInput>;
};

export type SubscriptionScenarioPaymentArgs = {
  where?: Maybe<ScenarioPaymentSubscriptionWhereInput>;
};
