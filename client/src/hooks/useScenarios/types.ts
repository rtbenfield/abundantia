export { Loan } from "../../hooks/useLoan";

export interface AmortizationPayment {
  amount: number;
  balance: number;
  date: Date;
  interest: number;
  interestToDate: number;
  paymentNumber: number;
  principal: number;
  principalToDate: number;
}

export interface Scenario extends ScenarioModel {
  amortizationSchedule: readonly AmortizationPayment[];
}

export interface ScenarioCreate {
  additionalPayments: readonly ScenarioPaymentCreate[];
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
