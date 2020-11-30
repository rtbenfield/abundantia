import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import { useTheme } from "@material-ui/core/styles";
import { withProfiler } from "@sentry/react";
import * as React from "react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  AmortizationPayment,
  makeAmortizationSchedule,
} from "../../components/Loan/utils";
import { Loan } from "../../hooks/useLoans";
import { Scenario } from "../../hooks/useScenarios";

interface ComparisonChartProps {
  field: keyof AmortizationPayment;
  loan: Loan;
  scenarios: readonly Scenario[];
  title: string;
}

const ComparisonChart: React.FC<ComparisonChartProps> = ({
  field,
  loan,
  scenarios,
  title,
}) => {
  const theme = useTheme();
  const baseScenario = React.useMemo(() => {
    return makeAmortizationSchedule(loan);
  }, [loan]);
  const data = React.useMemo(() => {
    const amortization = scenarios.map((s) =>
      makeAmortizationSchedule(loan, {
        additionalPayments: s.additionalPayments,
      }),
    );
    return baseScenario.map((base, i) => {
      const dateScenarios = Object.fromEntries(
        amortization.map((s, si) => [
          `scenario${si}`,
          s[i].balance > 0 ? s[i][field] : null,
        ]),
      );
      return {
        base: base[field],
        date: base.date.getTime(),
        ...dateScenarios,
      };
    });
  }, [baseScenario, field, scenarios]);

  const colors = getColorGenerator();
  return (
    <Card style={{ overflow: "visible" }}>
      <CardHeader title={title} titleTypographyProps={{ variant: "h6" }} />
      <ResponsiveContainer height={240}>
        <LineChart data={data} syncId="explore">
          <Tooltip
            allowEscapeViewBox={{ x: true, y: true }}
            contentStyle={{
              backgroundColor: theme.palette.background.paper,
              border: "none",
              borderRadius: theme.shape.borderRadius,
              boxShadow: theme.shadows[23],
            }}
            cursor={{ stroke: theme.palette.divider, strokeDasharray: "" }}
            formatter={(value: number | string, name: string) =>
              [currencyFormat.format(+value), name] as any
            }
            labelFormatter={(value) => dateFormat.format(new Date(value))}
            labelStyle={theme.typography.caption}
            wrapperStyle={{ zIndex: theme.zIndex.tooltip }}
          />
          <XAxis dataKey="date" hide />
          <YAxis domain={[0, "dataMax"]} hide type="number" />
          <Line
            activeDot={{ stroke: "none" }}
            dataKey="base"
            dot={false}
            name="Base"
            stroke={colors.next().value}
          />
          {scenarios
            .slice()
            .sort(sortScenarios)
            .map((s, i) => {
              return (
                <Line
                  activeDot={{ stroke: "none" }}
                  dataKey={`scenario${i}`}
                  dot={false}
                  name={s.name}
                  key={s.id}
                  stroke={colors.next().value}
                />
              );
            })}
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default withProfiler(ComparisonChart, { name: "ComparisonChart" });

function* getColorGenerator(): Generator<string, never, void> {
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

function sortScenarios(a: Scenario, b: Scenario): number {
  if (a.name === "Base") {
    return -1;
  } else if (b.name === "Base") {
    return 1;
  } else {
    return a.name.localeCompare(b.name);
  }
}

const currencyFormat = new Intl.NumberFormat("en-US", {
  currency: "USD",
  style: "currency",
});

const dateFormat = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "numeric",
  timeZone: "UTC",
  year: "numeric",
});
