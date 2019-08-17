import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
  InputAdornment,
  TextField,
} from "@material-ui/core";
import * as React from "react";
import useLoan, { Loan, LoanUpdateModel } from "../../../hooks/useLoan";
import { DateTime } from "luxon";

interface EditLoanDialogProps {
  loanId: string;
  open: boolean;
  onClose(): void;
}

interface UseLoanFormResult {
  errors: Readonly<Record<keyof LoanUpdateModel, string | undefined>>;
  hasErrors: boolean;
  values: Readonly<Record<keyof LoanUpdateModel, string>>;
  getLoan(): LoanUpdateModel;
  reset(): void;
  setValue(key: keyof LoanUpdateModel, value: string): void;
}

function convertLoanToValues(loan: Partial<LoanUpdateModel> = {}): Record<keyof LoanUpdateModel, string> {
  return {
    loanAmount: loan.loanAmount ? loan.loanAmount.toString() : "",
    name: loan.name || "",
    periodInterestRate: loan.periodInterestRate ? (loan.periodInterestRate * 100).toFixed(3) : "",
    periods: loan.periods ? loan.periods.toString() : "",
    startDate: loan.startDate ? DateTime.fromJSDate(loan.startDate).toFormat("yyyy-LL-dd") : "",
  };
}

function getErrors(values: Record<keyof LoanUpdateModel, string>): Record<keyof LoanUpdateModel, string | undefined> {
  return {
    loanAmount: !values.loanAmount || isNaN(Number(values.loanAmount)) ? "Loan Amount is required" : undefined,
    name: !values.name ? "Name is required" : undefined,
    periodInterestRate:
      !values.periodInterestRate || isNaN(Number(values.periodInterestRate))
        ? "Period Interest Rate is required"
        : undefined,
    periods: !values.periods || isNaN(Number(values.periods)) ? "Months is required" : undefined,
    startDate: !DateTime.fromFormat(values.startDate, "yyyy-LL-dd").isValid ? "Invalid date" : undefined,
  };
}

const DEFAULT_INITIAL_VALUES: Partial<Loan> = {};
function useLoanForm(initialValues: Partial<Loan> = DEFAULT_INITIAL_VALUES): UseLoanFormResult {
  const [values, setValues] = React.useState<Readonly<Record<keyof LoanUpdateModel, string>>>(() => {
    return convertLoanToValues(initialValues);
  });

  React.useEffect(() => {
    setValues(convertLoanToValues(initialValues));
  }, [initialValues]);

  const errors = React.useMemo(() => getErrors(values), [values]);

  return {
    errors,
    hasErrors: Object.values(errors).some(Boolean),
    getLoan: () => {
      return {
        loanAmount: Number(values.loanAmount),
        name: values.name,
        periodInterestRate: Number(values.periodInterestRate) / 100,
        periods: Number(values.periods),
        startDate: DateTime.fromFormat(values.startDate, "yyyy-LL-dd", { locale: "UTC" }).toJSDate(),
      };
    },
    reset: () => {
      setValues(convertLoanToValues(initialValues));
    },
    setValue: (key, value) => setValues(prev => ({ ...prev, [key]: value })),
    values,
  };
}

const EditLoanDialog: React.FunctionComponent<EditLoanDialogProps> = ({ loanId, onClose, open }) => {
  const { isLoading, loan, updateLoan } = useLoan(loanId);
  const { errors, getLoan, hasErrors, reset, setValue, values } = useLoanForm(loan);

  async function handleSubmit() {
    await updateLoan(getLoan());
    onClose();
  }

  return (
    <Dialog maxWidth="xs" onClose={onClose} open={open} onExited={reset}>
      <DialogTitle>Edit Loan</DialogTitle>
      {!isLoading && (
        <DialogContent>
          <TextField
            autoFocus
            error={!!errors.name}
            fullWidth
            helperText={errors.name}
            label="Name"
            margin="normal"
            onChange={e => setValue("name", e.target.value)}
            required
            value={values.name}
          />
          <TextField
            error={!!errors.loanAmount}
            fullWidth
            helperText={errors.loanAmount}
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
            label="Loan Amount"
            margin="normal"
            onChange={e => setValue("loanAmount", e.target.value)}
            required
            type="number"
            value={values.loanAmount}
          />
          <TextField
            error={!!errors.periods}
            fullWidth
            helperText={errors.periods}
            label="Months"
            margin="normal"
            onChange={e => setValue("periods", e.target.value)}
            required
            type="number"
            value={values.periods}
          />
          <TextField
            error={!!errors.periodInterestRate}
            fullWidth
            helperText={errors.periodInterestRate || "Divide annual interest rates by 12"}
            InputProps={{
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            }}
            label="Period Interest Rate"
            margin="normal"
            onChange={e => setValue("periodInterestRate", e.target.value)}
            required
            type="number"
            value={values.periodInterestRate}
          />
          <TextField
            error={!!errors.startDate}
            fullWidth
            helperText={errors.startDate}
            InputLabelProps={{
              shrink: true,
            }}
            label="Date"
            margin="normal"
            onChange={e => setValue("startDate", e.target.value)}
            required
            type="date"
            value={values.startDate}
          />
        </DialogContent>
      )}
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="primary" disabled={hasErrors} onClick={handleSubmit}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditLoanDialog;
