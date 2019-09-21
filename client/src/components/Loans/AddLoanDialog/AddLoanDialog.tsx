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
import useDocumentTitle from "../../../hooks/useDocumentTitle";
import useLoans, { PeriodType } from "../../../hooks/useLoans";
import { DateTime } from "luxon";

interface AddLoanDialogProps {
  open: boolean;
  onClose(): void;
  onLoanAdded(loan: { id: string }): void;
}

const AddLoanDialog: React.FunctionComponent<AddLoanDialogProps> = ({ onClose, onLoanAdded, open }) => {
  useDocumentTitle("Add Loan");
  const { createLoan } = useLoans();
  const [name, setName] = React.useState<string>("");
  const [loanAmount, setLoanAmount] = React.useState<string>("");
  const [years, setYears] = React.useState<string>("");
  const [annualInterestRate, setAnnualInterestRate] = React.useState<string>("");
  const [startDate, setStartDate] = React.useState<string>("");

  async function handleSubmit() {
    const loan = await createLoan({
      loanAmount: Number(loanAmount),
      name,
      periodInterestRate: Number(annualInterestRate) / 12 / 100,
      periods: Number(years) * 12,
      periodType: PeriodType.monthly,
      startDate: new Date(startDate),
    });
    onLoanAdded(loan);
  }

  function reset() {
    setName("");
    setLoanAmount("");
    setYears("");
    setAnnualInterestRate("");
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
        <TextField
          error={!years || isNaN(Number(years))}
          fullWidth
          label="Years"
          margin="normal"
          onChange={e => setYears(e.target.value)}
          type="number"
          value={years}
        />
        <TextField
          error={!annualInterestRate || isNaN(Number(annualInterestRate))}
          fullWidth
          InputProps={{
            endAdornment: <InputAdornment position="end">%</InputAdornment>,
          }}
          label="Annual Interest Rate"
          margin="normal"
          onChange={e => setAnnualInterestRate(e.target.value)}
          required
          type="number"
          value={annualInterestRate}
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
