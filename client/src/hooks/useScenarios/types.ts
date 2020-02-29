export { Loan } from "../../hooks/useLoan";

export interface AmortizationPayment {
  readonly amount: number;
  readonly balance: number;
  readonly date: Date;
  readonly interest: number;
  readonly interestToDate: number;
  readonly paymentNumber: number;
  readonly principal: number;
  readonly principalToDate: number;
}

export interface Scenario extends ScenarioModel {
  readonly amortizationSchedule: readonly AmortizationPayment[];
}

export interface ScenarioCreate {
  readonly additionalPayments: readonly ScenarioPaymentCreate[];
  readonly name: string;
}

export interface ScenarioModel {
  readonly additionalPayments: readonly ScenarioPayment[];
  readonly id: string;
  readonly name: string;
}

export interface ScenarioPayment {
  readonly from: Date;
  readonly id: string;
  readonly principalAmount: number;
  readonly to?: Date;
}

export interface ScenarioPaymentCreate {
  readonly from: Date;
  readonly principalAmount: number;
  readonly to?: Date;
}
