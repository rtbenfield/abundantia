import { InputAdornment, TextField } from "@material-ui/core";
import { DatePicker } from "@material-ui/pickers";
import * as React from "react";
import { UseLoanFormResult } from "./useLoanForm";

interface LoanFormProps {
  loanForm: UseLoanFormResult;
}

const LoanForm: React.FunctionComponent<LoanFormProps> = ({ loanForm }) => {
  const { errors, setValue, values } = loanForm;

  return (
    <>
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
    </>
  );
};

export default LoanForm;
