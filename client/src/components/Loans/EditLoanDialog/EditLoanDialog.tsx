import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
  InputAdornment,
  TextField,
} from "@material-ui/core";
import { DatePicker } from "@material-ui/pickers";
import * as React from "react";
import useLoan, { Loan, LoanUpdateModel } from "../../../hooks/useLoan";

interface EditLoanDialogProps {
  loanId: string;
  open: boolean;
  onClose(): void;
}

interface LoanForm {
  annualInterestRate: string;
  loanAmount: string;
  name: string;
  startDate?: Date;
  years: string;
}

interface UseLoanFormResult {
  errors: Readonly<Record<keyof LoanForm, string | undefined>>;
  hasErrors: boolean;
  values: LoanForm;
  getLoan(): LoanUpdateModel;
  reset(): void;
  setValue(updates: Partial<LoanForm>): void;
}

function convertLoanToValues(loan: Partial<LoanUpdateModel> = {}): LoanForm {
  return {
    annualInterestRate: loan.periodInterestRate ? (loan.periodInterestRate * 12 * 100).toFixed(3) : "",
    loanAmount: loan.loanAmount ? loan.loanAmount.toString() : "",
    name: loan.name || "",
    startDate: loan.startDate,
    years: loan.periods ? (loan.periods / 12).toString() : "",
  };
}

function getErrors(values: LoanForm): Record<keyof LoanForm, string | undefined> {
  console.log(values.startDate);
  return {
    annualInterestRate:
      !values.annualInterestRate || isNaN(Number(values.annualInterestRate))
        ? "Annual Interest Rate is required"
        : undefined,
    loanAmount: !values.loanAmount || isNaN(Number(values.loanAmount)) ? "Loan Amount is required" : undefined,
    name: !values.name ? "Name is required" : undefined,
    startDate: !values.startDate ? "Start date is required" : undefined,
    years: !values.years || isNaN(Number(values.years)) ? "Years is required" : undefined,
  };
}

const DEFAULT_INITIAL_VALUES: Partial<Loan> = {};
function useLoanForm(initialValues: Partial<Loan> = DEFAULT_INITIAL_VALUES): UseLoanFormResult {
  const [values, setValues] = React.useState<Readonly<LoanForm>>(() => {
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
        periodInterestRate: Number(values.annualInterestRate) / 12 / 100,
        periods: Number(values.years) * 12,
        startDate: values.startDate,
      };
    },
    reset: () => {
      setValues(convertLoanToValues(initialValues));
    },
    setValue: updates => setValues(prev => ({ ...prev, ...updates })),
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
            onChange={e => setValue({ name: e.target.value })}
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
            onChange={e => setValue({ loanAmount: e.target.value })}
            required
            type="number"
            value={values.loanAmount}
          />
          <TextField
            error={!!errors.years}
            fullWidth
            helperText={errors.years}
            label="Years"
            margin="normal"
            onChange={e => setValue({ years: e.target.value })}
            required
            type="number"
            value={values.years}
          />
          <TextField
            error={!!errors.annualInterestRate}
            fullWidth
            helperText={errors.annualInterestRate}
            InputProps={{
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            }}
            label="Annual Interest Rate"
            margin="normal"
            onChange={e => setValue({ annualInterestRate: e.target.value })}
            required
            type="number"
            value={values.annualInterestRate}
          />
          <DatePicker
            autoOk
            error={!!errors.startDate}
            fullWidth
            helperText={errors.startDate}
            label="Starting Month"
            margin="normal"
            onChange={e => setValue({ startDate: e?.toJSDate() })}
            required
            value={values.startDate}
            variant="inline"
            views={["year", "month"]}
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
