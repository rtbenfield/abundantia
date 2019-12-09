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
import useDocumentTitle from "../../../hooks/useDocumentTitle";
import useLoans, { PeriodType } from "../../../hooks/useLoans";

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
  const [startDate, setStartDate] = React.useState<Date | undefined>(undefined);

  async function handleSubmit() {
    if (!startDate) {
      throw new Error("startDate is undefined");
    }
    const loan = await createLoan({
      loanAmount: Number(loanAmount),
      name,
      periodInterestRate: Number(annualInterestRate) / 12 / 100,
      periods: Number(years) * 12,
      periodType: PeriodType.monthly,
      startDate,
    });
    onLoanAdded(loan);
  }

  function reset() {
    setName("");
    setLoanAmount("");
    setYears("");
    setAnnualInterestRate("");
    setStartDate(undefined);
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
        <DatePicker
          autoOk
          error={!startDate}
          fullWidth
          label="Starting Month"
          margin="normal"
          onChange={e => setStartDate(e?.toJSDate())}
          required
          value={startDate ?? null}
          variant="inline"
          views={["year", "month"]}
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
