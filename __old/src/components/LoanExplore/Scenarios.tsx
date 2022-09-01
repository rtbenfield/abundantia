import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import * as React from "react";
import { makeAmortizationSchedule } from "../../components/Loan/utils";
import type { Loan } from "../../hooks/useLoans";
import type { Scenario } from "../../hooks/useScenarios";

interface ScenarioProps {
  className?: string;
  loan: Loan;
  onAddScenario(): void;
  onEditCancel(): void;
  onEditScenario(scenario: Scenario): void;
  onRemoveScenario(id: string): void;
  scenarios: readonly Scenario[];
}

const Scenarios: React.FC<ScenarioProps> = ({
  loan,
  onAddScenario,
  onEditCancel,
  onEditScenario,
  onRemoveScenario,
  scenarios,
  ...props
}) => {
  const baseInterest = React.useMemo(() => {
    const amortizationSchedule = makeAmortizationSchedule(loan);
    return amortizationSchedule.reduce((prev, curr) => prev + curr.interest, 0);
  }, [loan]);

  const scenarioInterest = React.useMemo(() => {
    return scenarios
      .map((s) => {
        const amortization = makeAmortizationSchedule(loan, {
          additionalPayments: s.additionalPayments,
        });
        const interestSaved =
          baseInterest -
          amortization.reduce((prev, curr) => prev + curr.interest, 0);
        return {
          ...s,
          interestSaved,
        };
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [baseInterest, loan, scenarios]);

  return (
    <List {...props}>
      <ListItem button onClick={() => onEditCancel()}>
        <ListItemText
          primary="Base"
          secondary={`${currencyFormat.format(baseInterest)} interest`}
        />
      </ListItem>
      {scenarioInterest.length > 0 && <Divider />}
      {scenarioInterest.map((s, i) => {
        return (
          <ListItem button key={i} onClick={() => onEditScenario(s)}>
            <ListItemText
              primary={s.name}
              secondary={`${currencyFormat.format(s.interestSaved)} saved`}
            />
            <ListItemSecondaryAction>
              <IconButton
                aria-label="remove scenario"
                edge="end"
                onClick={() => onRemoveScenario(s.id)}
              >
                <RemoveIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
      <Divider />
      <ListItem
        button
        disabled={scenarios.length === 10}
        onClick={onAddScenario}
      >
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
