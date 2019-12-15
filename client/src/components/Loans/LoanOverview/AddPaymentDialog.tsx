import {
  Dialog,
  DialogContent,
  InputAdornment,
  DialogTitle,
  DialogActions,
  Button,
  TextField,
} from "@material-ui/core";
import { DateTime } from "luxon";
import * as React from "react";
import { useCreatePayment } from "../hooks";

interface AddPaymentDialogProps {
  loanId: string;
  onClose(): void;
  open: boolean;
}

const AddPaymentDialog: React.FC<AddPaymentDialogProps> = ({ loanId, onClose, open }) => {
  const [date, setDate] = React.useState<string>(getDefaultDate);
  const [interest, setInterest] = React.useState<string>("");
  const [note, setNote] = React.useState<string>("");
  const [principal, setPrincipal] = React.useState<string>("");
  const [createPayment, { loading }] = useCreatePayment();

  async function handleSubmit() {
    await createPayment({
      variables: {
        id: loanId,
        payment: {
          date: date,
          interest: +interest,
          note,
          principal: +principal,
        },
      },
    });
    onClose();
  }

  function reset() {
    setDate(getDefaultDate());
    setInterest("");
    setNote("");
    setPrincipal("");
  }

  return (
    <Dialog maxWidth="xs" onClose={onClose} open={open} onExited={reset}>
      <DialogTitle>Add Payment</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          label="Date"
          onChange={e => setDate(e.target.value)}
          type="date"
          value={date}
        />
        <TextField
          fullWidth
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          label="Principal"
          onChange={e => setPrincipal(e.target.value)}
          type="number"
          value={principal}
        />
        <TextField
          fullWidth
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          label="Interest"
          onChange={e => setInterest(e.target.value)}
          type="number"
          value={interest}
        />
        <TextField fullWidth label="Notes" multiline onChange={e => setNote(e.target.value)} value={note} />
      </DialogContent>
      <DialogActions>
        <Button disabled={loading} onClick={onClose}>
          Cancel
        </Button>
        <Button color="primary" disabled={loading} onClick={handleSubmit}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

function getDefaultDate(): string {
  return DateTime.local().toFormat("yyyy-LL-dd");
}

export default AddPaymentDialog;
