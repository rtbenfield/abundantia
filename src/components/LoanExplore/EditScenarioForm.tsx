import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { DatePicker } from "@material-ui/pickers";
import * as React from "react";
import {
  Scenario,
  ScenarioCreateModel,
  ScenarioPaymentCreateModel,
} from "../../hooks/useScenarios";

interface EditScenarioFormProps {
  scenario: Scenario;
  onCancel(): void;
  onSave(scenario: ScenarioCreateModel): void;
}

const EditScenarioForm: React.FC<EditScenarioFormProps> = ({
  onCancel,
  onSave,
  scenario,
}) => {
  const [additionalPayments, setAdditionalPayments] = React.useState<
    readonly ScenarioPaymentCreateModel[]
  >([]);
  const [name, setName] = React.useState<string>("");

  React.useEffect(() => {
    // Reset form state for new scenario
    setAdditionalPayments(
      scenario.additionalPayments
        .map((x) => ({ ...x }))
        .sort((a, b) => {
          if (a.to && !b.to) {
            return -1;
          } else if (b.to && !a.to) {
            return 1;
          } else {
            return a.from.getTime() - b.from.getTime();
          }
        }),
    );
    setName(scenario.name);
  }, [scenario]);

  function addPayment() {
    setAdditionalPayments((prev) => {
      return [
        ...prev,
        {
          from: new Date(),
          principalAmount: 0,
          to: null,
        },
      ];
    });
  }

  function removePayment(index: number) {
    setAdditionalPayments((prev) => {
      const copy = [...prev];
      copy.splice(index, 1);
      return copy;
    });
  }

  function updatePayment(
    index: number,
    update: Partial<ScenarioPaymentCreateModel>,
  ) {
    setAdditionalPayments((prev) => {
      const copy = [...prev];
      copy.splice(index, 1, { ...copy[index], ...update });
      return copy;
    });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSave({ additionalPayments, name });
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Name"
        margin="normal"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Additional Principal</TableCell>
            <TableCell>From</TableCell>
            <TableCell>To</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {additionalPayments.length === 0 && (
            <TableRow>
              <TableCell align="center" colSpan={1000}>
                No payments have been added to this scenario
              </TableCell>
            </TableRow>
          )}
          {additionalPayments.map((p, i) => (
            <TableRow key={i}>
              <TableCell>
                <TextField
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  onChange={(e) =>
                    updatePayment(i, {
                      principalAmount: Number(e.target.value),
                    })
                  }
                  type="number"
                  value={p.principalAmount}
                />
              </TableCell>
              <TableCell>
                <DatePicker
                  autoOk
                  format="MM/dd/yyyy"
                  fullWidth
                  onChange={(e) =>
                    updatePayment(i, { from: e?.toJSDate() ?? undefined })
                  }
                  value={p.from}
                  variant="dialog"
                />
              </TableCell>
              <TableCell>
                <DatePicker
                  autoOk
                  clearable
                  emptyLabel="Active"
                  format="MM/dd/yyyy"
                  fullWidth
                  onChange={(e) =>
                    updatePayment(i, { to: e?.toJSDate() ?? undefined })
                  }
                  value={p.to ?? null}
                  variant="dialog"
                />
              </TableCell>
              <TableCell>
                <IconButton
                  aria-label="remove payment"
                  onClick={() => removePayment(i)}
                >
                  <RemoveIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell align="center" colSpan={1000}>
              <Button
                color="primary"
                onClick={addPayment}
                size="small"
                type="button"
                variant="outlined"
              >
                <AddIcon /> Add Payment
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell align="right" colSpan={1000}>
              <Button onClick={onCancel}>Cancel</Button>
              <Button color="primary" type="submit" variant="contained">
                Save
              </Button>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </form>
  );
};

export default EditScenarioForm;
