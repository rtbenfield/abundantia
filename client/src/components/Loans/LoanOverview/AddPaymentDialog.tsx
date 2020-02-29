import {
  Dialog,
  DialogContent,
  InputAdornment,
  DialogTitle,
  DialogActions,
  Button,
  TextField,
} from "@material-ui/core";
import { DatePicker } from "@material-ui/pickers";
import { DateTime } from "luxon";
import * as React from "react";
import useLoan from "../../../hooks/useLoan";
import { useSnackbar } from "notistack";

interface AddPaymentDialogProps {
  loanId: string;
  onClose(): void;
  open: boolean;
}

interface AddPaymentState {
  readonly date: Date | null;
  readonly interest: string;
  readonly note: string;
  readonly principal: string;
}

const AddPaymentDialog: React.FC<AddPaymentDialogProps> = ({ loanId, onClose, open }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { createPayment, loan } = useLoan(loanId);
  const [state, setState] = React.useState<AddPaymentState>(getDefaultState);
  const [isLoading, setIsLoading] = React.useState(false);

  const errors = getErrors(state);
  const hasErrors = Object.values(errors).some(Boolean);

  async function handleSubmit(): Promise<void> {
    if (state.date) {
      setIsLoading(true);
      try {
        await createPayment({
          date: state.date,
          interest: +state.interest,
          note: state.note,
          principal: +state.principal,
        });
        onClose();
      } catch (e) {
        enqueueSnackbar(`Error adding payment to ${loan?.name ?? "loan"}.`, {
          variant: "error",
        });
      } finally {
        setIsLoading(false);
      }
    }
  }

  function setValue(updates: Partial<AddPaymentState>): void {
    setState(prev => {
      return { ...prev, ...updates };
    });
  }

  function reset(): void {
    setState(getDefaultState());
  }

  return (
    <Dialog maxWidth="xs" onClose={onClose} open={open} onExited={reset}>
      <DialogTitle>Add Payment</DialogTitle>
      <DialogContent>
        <DatePicker
          autoOk
          error={!!errors.date}
          fullWidth
          helperText={errors.date}
          label="Date"
          margin="normal"
          onChange={e => setValue({ date: e?.toJSDate() })}
          required
          value={state.date}
          variant="inline"
          views={["year", "month", "date"]}
        />
        <TextField
          error={!!errors.principal}
          fullWidth
          helperText={errors.principal}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          label="Principal"
          margin="normal"
          onChange={e => setValue({ principal: e.target.value })}
          placeholder="0.00"
          type="number"
          value={state.principal}
        />
        <TextField
          error={!!errors.interest}
          fullWidth
          helperText={errors.interest}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          label="Interest"
          margin="normal"
          onChange={e => setValue({ interest: e.target.value })}
          placeholder="0.00"
          type="number"
          value={state.interest}
        />
        <TextField
          error={!!errors.note}
          fullWidth
          helperText={errors.note}
          label="Notes"
          margin="normal"
          multiline
          onChange={e => setValue({ note: e.target.value })}
          value={state.note}
        />
      </DialogContent>
      <DialogActions>
        <Button disabled={isLoading} onClick={onClose}>
          Cancel
        </Button>
        <Button color="primary" disabled={isLoading || hasErrors} onClick={handleSubmit}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

function getDefaultState(): AddPaymentState {
  return {
    date: DateTime.local().toJSDate(),
    interest: "",
    note: "",
    principal: "",
  };
}

function getErrors(values: AddPaymentState): Record<keyof AddPaymentState, string | undefined> {
  return {
    date: !values.date ? "Date is required" : undefined,
    interest: values.interest && isNaN(Number(values.interest)) ? "Interest must be a valid number" : undefined,
    principal: values.principal && isNaN(Number(values.principal)) ? "Principal must be a valid number" : undefined,
    note: undefined,
  };
}

export default AddPaymentDialog;
