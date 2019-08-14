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
import useLoans, { PeriodType } from "../../../hooks/useLoans";
import { DateTime } from "luxon";

interface AddLoanDialogProps {
  open: boolean;
  onClose(): void;
  onLoanAdded(loan: { id: string }): void;
}

const AddLoanDialog: React.FunctionComponent<AddLoanDialogProps> = ({ onClose, onLoanAdded, open }) => {
  const { createLoan } = useLoans();
  const [name, setName] = React.useState<string>("");
  const [loanAmount, setLoanAmount] = React.useState<string>("");
  const [periods, setPeriods] = React.useState<string>("");
  const [periodInterestRate, setPeriodInterestRate] = React.useState<string>("");
  const [startDate, setStartDate] = React.useState<string>("");

  async function handleSubmit() {
    const loan = await createLoan({
      loanAmount: Number(loanAmount),
      name,
      periodInterestRate: Number(periodInterestRate),
      periods: Number(periods),
      periodType: PeriodType.monthly,
      startDate: new Date(startDate),
    });
    onLoanAdded(loan);
  }

  function reset() {
    setName("");
    setLoanAmount("");
    setPeriods("");
    setPeriodInterestRate("");
    setStartDate("");
  }

  return (
    <Dialog maxWidth="xs" onClose={onClose} open={open} onExited={reset}>
      <DialogTitle>Add Payment</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          error={!name}
          fullWidth
          label="Name"
          margin="normal"
          onChange={e => setName(e.target.value)}
          required
          value={name}
        />
        <TextField
          error={!loanAmount || isNaN(Number(loanAmount))}
          fullWidth
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          label="Loan Amount"
          margin="normal"
          onChange={e => setLoanAmount(e.target.value)}
          required
          type="number"
          value={loanAmount}
        />
        <TextField fullWidth label="Months" onChange={e => setPeriods(e.target.value)} type="number" value={periods} />
        <TextField
          error={!periodInterestRate || isNaN(Number(periodInterestRate))}
          fullWidth
          helperText="Divide annual interest rates by 12"
          InputProps={{
            endAdornment: <InputAdornment position="end">%</InputAdornment>,
          }}
          label="Period Interest Rate"
          margin="normal"
          onChange={e => setPeriodInterestRate(e.target.value)}
          required
          type="number"
          value={periodInterestRate}
        />
        <TextField
          error={!startDate || !DateTime.fromFormat(startDate, "yyyy-LL-dd").isValid}
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          label="Date"
          margin="normal"
          onChange={e => setStartDate(e.target.value)}
          required
          type="date"
          value={startDate}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="primary" onClick={handleSubmit}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddLoanDialog;
