import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import { makeStyles } from "@material-ui/core/styles";
import { withProfiler } from "@sentry/react";
import { ParentSize } from "@visx/responsive";
import * as React from "react";
import {
  AmortizationPayment,
  makeAmortizationSchedule,
} from "../../components/Loan/utils";
import { Loan } from "../../hooks/useLoans";
import { Scenario } from "../../hooks/useScenarios";
import ComparisonChart, { ScenarioSeries } from "./ComparisonChart";

interface ComparisonGridProps {
  loan: Loan;
  scenarios: readonly Scenario[];
}

const useStyles = makeStyles((theme) => ({
  cardContent: {
    height: theme.spacing(40),
    position: "relative",
  },
  cardHeader: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  root: {
    display: "grid",
    gridAutoRows: "min-content",
    gridGap: theme.spacing(),
    gridTemplateColumns: "1fr",
    padding: theme.spacing(2),
    overflow: "auto",
    [theme.breakpoints.up("md")]: {
      gridTemplateColumns: "1fr 1fr",
    },
  },
}));

function* makeColorGenerator(): Generator<string, never, void> {
  while (true) {
    yield "#B48EAD";
    yield "#D08770";
    yield "#A3BE8C";
    yield "#EBCB8B";
    yield "#8FBCBB";
    yield "#88C0D0";
    yield "#5E81AC";
    yield "#BF616A";
  }
}

const ComparisonGrid: React.FC<ComparisonGridProps> = ({ loan, scenarios }) => {
  const classes = useStyles();

  const baseScenario = React.useMemo<
    [Scenario, readonly AmortizationPayment[]]
  >(() => {
    return [
      {
        additionalPayments: [],
        id: "base",
        name: "Base",
      },
      makeAmortizationSchedule(loan),
    ];
  }, [loan]);

  const scenarioData = React.useMemo<readonly ScenarioSeries[]>(() => {
    const perfLabel = "ComparisonGrid amortization";
    console.time(perfLabel);
    const colors = makeColorGenerator();
    const result = [
      {
        color: colors.next().value,
        payments: baseScenario[1],
        scenario: baseScenario[0],
      },
      ...scenarios
        .slice()
        .sort((a, b) => a.name.localeCompare(b.name))
        .map<ScenarioSeries>((scenario) => {
          return {
            color: colors.next().value,
            payments: makeAmortizationSchedule(loan, {
              additionalPayments: scenario.additionalPayments,
            }).filter((x) => x.balance > 0),
            scenario,
          };
        }),
    ];
    console.timeEnd(perfLabel);
    return result;
  }, [baseScenario, loan, scenarios]);

  return (
    <div className={classes.root}>
      <Card>
        <CardHeader
          className={classes.cardHeader}
          title="Balance"
          titleTypographyProps={{ variant: "h6" }}
        />
        <ParentSize className={classes.cardContent} style={{}}>
          {({ height, width }) => (
            <ComparisonChart
              field="balance"
              loan={loan}
              scenarios={scenarioData}
              size={{ height, width }}
            />
          )}
        </ParentSize>
      </Card>
      <Card>
        <CardHeader
          className={classes.cardHeader}
          title="Payment Amount"
          titleTypographyProps={{ variant: "h6" }}
        />
        <ParentSize className={classes.cardContent} style={{}}>
          {({ height, width }) => (
            <ComparisonChart
              field="amount"
              loan={loan}
              scenarios={scenarioData}
              size={{ height, width }}
            />
          )}
        </ParentSize>
      </Card>
      <Card>
        <CardHeader
          className={classes.cardHeader}
          title="Interest Per Payment"
          titleTypographyProps={{ variant: "h6" }}
        />
        <ParentSize className={classes.cardContent} style={{}}>
          {({ height, width }) => (
            <ComparisonChart
              field="interest"
              loan={loan}
              scenarios={scenarioData}
              size={{ height, width }}
            />
          )}
        </ParentSize>
      </Card>
      <Card>
        <CardHeader
          className={classes.cardHeader}
          title="Principal Per Payment"
          titleTypographyProps={{ variant: "h6" }}
        />
        <ParentSize className={classes.cardContent} style={{}}>
          {({ height, width }) => (
            <ComparisonChart
              field="principal"
              loan={loan}
              scenarios={scenarioData}
              size={{ height, width }}
            />
          )}
        </ParentSize>
      </Card>
      <Card>
        <CardHeader
          className={classes.cardHeader}
          title="Total Interest Paid"
          titleTypographyProps={{ variant: "h6" }}
        />
        <ParentSize className={classes.cardContent} style={{}}>
          {({ height, width }) => (
            <ComparisonChart
              field="interestToDate"
              loan={loan}
              scenarios={scenarioData}
              size={{ height, width }}
            />
          )}
        </ParentSize>
      </Card>
      <Card>
        <CardHeader
          className={classes.cardHeader}
          title="Total Principal Paid"
          titleTypographyProps={{ variant: "h6" }}
        />
        <ParentSize className={classes.cardContent} style={{}}>
          {({ height, width }) => (
            <ComparisonChart
              field="principalToDate"
              loan={loan}
              scenarios={scenarioData}
              size={{ height, width }}
            />
          )}
        </ParentSize>
      </Card>
    </div>
  );
};

export default withProfiler(ComparisonGrid, {
  name: "ComparisonGrid",
});
