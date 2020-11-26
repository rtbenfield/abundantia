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

  return (
    <Card>
      <CardHeader title={title} titleTypographyProps={{ variant: "h6" }} />
      <ResponsiveContainer height={240}>
        <LineChart data={data} syncId="explore">
          <Tooltip
            contentStyle={{
              backgroundColor: theme.palette.background.paper,
              border: "none",
              borderRadius: theme.shape.borderRadius,
              boxShadow: theme.shadows[23],
            }}
            cursor={{ stroke: theme.palette.divider, strokeDasharray: "" }}
            formatter={(value: number | string, name: string) => [
              currencyFormat.format(+value),
              name,
            ]}
            labelFormatter={(value) => dateFormat.format(new Date(value))}
            labelStyle={theme.typography.caption}
          />
          <XAxis dataKey="date" hide />
          <YAxis domain={[0, "dataMax"]} hide type="number" />
          <Line
            activeDot={{ stroke: "none" }}
            dataKey="base"
            dot={false}
            name="Base"
            stroke={colors[0]}
          />
          {scenarios.map((s, i) => {
            return (
              <Line
                activeDot={{ stroke: "none" }}
                dataKey={`scenario${i}`}
                dot={false}
                name={s.name}
                key={s.id}
                stroke={colors[(i + 1) % colors.length]}
              />
            );
          })}
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default withProfiler(ComparisonChart);

const colors: readonly string[] = [
  "#B48EAD",
  "#D08770",
  "#A3BE8C",
  "#EBCB8B",
  "#8FBCBB",
  "#88C0D0",
  "#88C0D0",
  "#5E81AC",
  "#BF616A",
];

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
