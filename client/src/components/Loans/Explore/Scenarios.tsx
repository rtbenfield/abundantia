import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import * as React from "react";
import { Loan } from "../../../hooks/useLoan";
import { Scenario } from "../../../hooks/useScenarios";
import { useAmortizationTransform } from "../hooks";

interface ScenarioProps {
  className?: string;
  loan: Loan;
  scenarios: readonly Scenario[];
  onAddScenario(): void;
  onEditScenario(scenario: Scenario): void;
  onRemoveScenario(scenario: Scenario): void;
}

const Scenarios: React.FC<ScenarioProps> = ({
  loan,
  onAddScenario,
  onEditScenario,
  onRemoveScenario,
  scenarios,
  ...props
}) => {
  const amortizationSchedule = useAmortizationTransform(loan);

  const baseInterest = React.useMemo(() => {
    return amortizationSchedule.reduce((prev, curr) => prev + curr.interest, 0);
  }, [amortizationSchedule]);

  return (
    <List {...props}>
      <ListItem>
        <ListItemText primary="Base" secondary={`${currencyFormat.format(baseInterest)} interest`} />
      </ListItem>
      {scenarios.length > 0 && <Divider />}
      {scenarios.map((s, i) => {
        const interestSaved = baseInterest - s.amortizationSchedule.reduce((prev, curr) => prev + curr.interest, 0);

        return (
          <ListItem button key={i} onClick={() => onEditScenario(s)}>
            <ListItemText primary={s.name} secondary={`${currencyFormat.format(interestSaved)} saved`} />
            <ListItemSecondaryAction>
              <IconButton aria-label="remove scenario" edge="end" onClick={() => onRemoveScenario(s)}>
                <RemoveIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
      <Divider />
      <ListItem button disabled={scenarios.length === 10} onClick={onAddScenario}>
        <ListItemIcon>
          <AddIcon />
        </ListItemIcon>
        <ListItemText primary="Add Scenario" />
      </ListItem>
    </List>
  );
};

export default Scenarios;

const currencyFormat = new Intl.NumberFormat("en-US", {
  currency: "USD",
  style: "currency",
});
