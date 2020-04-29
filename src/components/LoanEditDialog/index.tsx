import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useSnackbar } from "notistack";
import * as React from "react";
import { useErrorCapture } from "../../hooks/useErrorCapture";
import { Loan, useLoanActions } from "../../hooks/useLoans";
import LoanForm, { useLoanForm } from "../LoanForm";

interface LoanEditDialogProps {
  loan: Loan;
  open: boolean;
  onClose(): void;
}

const LoanEditDialog: React.FC<LoanEditDialogProps> = ({
  loan,
  onClose,
  open,
}) => {
  const { captureError } = useErrorCapture();
  const { enqueueSnackbar } = useSnackbar();
  const { updateLoan } = useLoanActions();
  const [isPending, setIsPending] = React.useState(false);
  const loanForm = useLoanForm(loan!);
  const { getLoan, hasErrors, reset } = loanForm;

  async function handleSubmit() {
    setIsPending(true);
    const loanUpdate = getLoan();
    try {
      await updateLoan(loan.id, loanUpdate);
      onClose();
      enqueueSnackbar(`${loanUpdate.name ?? "Loan"} updated`, {
        variant: "info",
      });
    } catch (err) {
      captureError(err);
      enqueueSnackbar(`Error updating ${loanUpdate.name}`, {
        variant: "error",
      });
    } finally {
      setIsPending(false);
    }
  }

  return (
    <Dialog maxWidth="xs" onClose={onClose} open={open} onExited={reset}>
      <DialogTitle>Edit Loan</DialogTitle>
      <DialogContent>
        <LoanForm loanForm={loanForm} />
      </DialogContent>
      <DialogActions>
        <Button disabled={isPending} onClick={onClose}>
          Cancel
        </Button>
        <Button
          color="primary"
          disabled={hasErrors || isPending}
          onClick={handleSubmit}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoanEditDialog;
