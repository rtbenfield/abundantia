export { AmortizationPayment, Loan } from "../../hooks/useLoan";

export interface QueryResults {
  scenarios: readonly ScenarioModel[];
}

export interface Scenario extends ScenarioModel {
  amortizationSchedule: readonly AmortizationPayment[];
}

export interface ScenarioCreate {
  additionalPayments: readonly ScenarioPaymentCreate[];
  name: string;
}

export interface ScenarioUpdate {
  additionalPayments: readonly ScenarioPaymentCreate[];
  id: string;
  name: string;
}

export interface ScenarioModel {
  additionalPayments: readonly ScenarioPayment[];
  id: string;
  name: string;
}

export interface ScenarioPayment {
  from: Date;
  id: string;
  principalAmount: number;
  to?: Date;
}

export interface ScenarioPaymentCreate {
  from: Date;
  principalAmount: number;
  to?: Date;
}
