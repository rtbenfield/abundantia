import { AmortizationPayment } from "../types";

export interface AdditionalPayment {
  from: Date;
  principalAmount: number;
  to?: Date;
}

export interface Loan {
  id: string;
  loanAmount: number;
  name: string;
  payments: readonly Payment[];
  periodInterestRate: number;
  periods: number;
  periodType: PeriodType;
  startDate: string;
}

export interface Payment {
  date: string;
  id: string;
  interest: number;
  note: string;
  principal: number;
}

export enum PeriodType {
  monthly = "Monthly",
  yearly = "Yearly",
}

export interface QueryResults {
  loan: Loan;
}

export interface Scenario {
  additionalPayments: readonly AdditionalPayment[];
  amortizationSchedule: readonly AmortizationPayment[];
  id: string;
}
