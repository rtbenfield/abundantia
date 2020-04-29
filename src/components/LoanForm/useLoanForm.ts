import { useEffect, useMemo, useState } from "react";
import {
  Loan,
  LoanCreateModel,
  LoanUpdateModel,
  PeriodType,
} from "../../hooks/useLoans";

export interface LoanForm {
  readonly annualInterestRate: string;
  readonly loanAmount: string;
  readonly name: string;
  readonly startDate: Date | null;
  readonly years: string;
}

export interface UseLoanFormResult {
  errors: Readonly<Record<keyof LoanForm, string | undefined>>;
  hasErrors: boolean;
  values: LoanForm;
  getLoan(): LoanCreateModel & LoanUpdateModel;
  reset(): void;
  setValue(updates: Partial<LoanForm>): void;
}

function convertLoanToValues(loan: Partial<Loan> = {}): LoanForm {
  return {
    annualInterestRate: loan.periodInterestRate
      ? (loan.periodInterestRate * 12 * 100).toFixed(3)
      : "",
    loanAmount: loan.loanAmount ? loan.loanAmount.toString() : "",
    name: loan.name || "",
    startDate: loan.startDate ?? null,
    years: loan.periods ? (loan.periods / 12).toString() : "",
  };
}

function getErrors(
  values: LoanForm,
): Record<keyof LoanForm, string | undefined> {
  return {
    annualInterestRate:
      !values.annualInterestRate || isNaN(Number(values.annualInterestRate))
        ? "Annual Interest Rate is required"
        : undefined,
    loanAmount:
      !values.loanAmount || isNaN(Number(values.loanAmount))
        ? "Loan Amount is required"
        : undefined,
    name: !values.name ? "Name is required" : undefined,
    startDate: !values.startDate ? "Start date is required" : undefined,
    years:
      !values.years || isNaN(Number(values.years))
        ? "Years is required"
        : undefined,
  };
}

const DEFAULT_INITIAL_VALUES: Partial<Loan> = {};
export function useLoanForm(
  initialValues: Partial<Loan> = DEFAULT_INITIAL_VALUES,
): UseLoanFormResult {
  const [values, setValues] = useState<Readonly<LoanForm>>(() => {
    return convertLoanToValues(initialValues);
  });

  useEffect(() => {
    setValues(convertLoanToValues(initialValues));
  }, [initialValues]);

  const errors = useMemo(() => getErrors(values), [values]);
  const hasErrors = Object.values(errors).some(Boolean);

  return {
    errors,
    hasErrors,
    getLoan() {
      if (hasErrors) {
        throw new Error("getLoan cannot be called while form has errors");
      }
      return {
        loanAmount: Number(values.loanAmount),
        name: values.name,
        periodInterestRate: Number(values.annualInterestRate) / 12 / 100,
        periods: Number(values.years) * 12,
        periodType: PeriodType.Monthly,
        startDate: values.startDate!,
      };
    },
    reset() {
      setValues(convertLoanToValues(initialValues));
    },
    setValue(updates) {
      setValues((prev) => ({ ...prev, ...updates }));
    },
    values,
  };
}
