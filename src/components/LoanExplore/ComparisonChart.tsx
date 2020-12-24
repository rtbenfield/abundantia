import { fade, makeStyles, useTheme } from "@material-ui/core/styles";
import { withProfiler } from "@sentry/react";
import { curveNatural } from "@visx/curve";
import { localPoint } from "@visx/event";
import { scaleLinear, scaleTime } from "@visx/scale";
import { Line, LinePath } from "@visx/shape";
import { defaultStyles, useTooltip, useTooltipInPortal } from "@visx/tooltip";
import { extent, max } from "d3-array";
import * as React from "react";
import type { AmortizationPayment } from "../../components/Loan/utils";
import type { Loan } from "../../hooks/useLoans";
import type { Scenario } from "../../hooks/useScenarios";

interface ComparisonChartProps {
  field: Exclude<keyof AmortizationPayment, "date" | "paymentNumber">;
  loan: Loan;
  scenarios: readonly ScenarioSeries[];
  size: {
    readonly height: number;
    readonly width: number;
  };
}

export interface ScenarioSeries {
  readonly color: string;
  readonly payments: readonly AmortizationPayment[];
  readonly scenario: Scenario;
}

interface ScenarioTooltip {
  readonly color: string;
  readonly payment: AmortizationPayment;
  readonly scenario: Scenario;
}

const useStyles = makeStyles((theme) => ({
  tooltip: {
    ...defaultStyles,
    backgroundColor: fade(theme.palette.background.default, 0.92),
    borderRadius: theme.shape.borderRadius,
    color: theme.typography.body1.color,
    padding: theme.spacing(1, 2),
    zIndex: theme.zIndex.tooltip,
  },
  tooltipLine: {
    stroke: theme.palette.primary.main,
  },
}));

const ComparisonChart: React.FC<ComparisonChartProps> = ({
  field,
  loan,
  scenarios,
  size: { height, width },
}) => {
  const theme = useTheme();
  const classes = useStyles();
  const margin = { top: theme.spacing() };

  const [minDate = loan.startDate, maxDate = loan.startDate] = extent(
    scenarios.flatMap(({ payments }) => payments),
    (x) => x.date,
  );
  const xScale = scaleTime({
    domain: [minDate, maxDate],
    range: [0, width],
  });
  const yScale = scaleLinear({
    domain: [
      0,
      max(
        scenarios.flatMap(({ payments }) => payments),
        (x) => x[field],
      ) ?? 0,
    ],
    range: [height, margin.top],
  });

  const { containerRef, TooltipInPortal } = useTooltipInPortal({
    detectBounds: true,
    scroll: true,
  });
  const {
    hideTooltip,
    showTooltip,
    tooltipData,
    tooltipLeft,
    tooltipOpen,
    tooltipTop,
  } = useTooltip<readonly ScenarioTooltip[]>();

  const lastFrameRef = React.useRef<number>(0);
  function handlePointerMove(event: React.PointerEvent<SVGSVGElement>) {
    const point = localPoint(event);
    if (point) {
      window.cancelAnimationFrame(lastFrameRef.current);
      lastFrameRef.current = window.requestAnimationFrame(() => {
        const cursorDate = xScale.invert(point.x);
        const newTooltipData = scenarios
          .map<ScenarioTooltip | null>(({ color, payments, scenario }) => {
            const payment = payments.find(
              (x) =>
                x.date.getMonth() === cursorDate.getMonth() &&
                x.date.getFullYear() === cursorDate.getFullYear(),
            );
            return payment ? { color, payment, scenario } : null;
          })
          .filter((x): x is Exclude<typeof x, null> => x !== null);
        showTooltip({
          tooltipLeft: point.x,
          tooltipTop: point.y,
          tooltipData: newTooltipData,
        });
      });
    }
  }
  function handlePointerLeave() {
    window.cancelAnimationFrame(lastFrameRef.current);
    hideTooltip();
  }

  return (
    <svg
      height={height}
      onPointerLeave={handlePointerLeave}
      onPointerMove={handlePointerMove}
      ref={containerRef}
      width={width}
    >
      {tooltipOpen && (
        <>
          <TooltipInPortal
            className={classes.tooltip}
            left={tooltipLeft}
            top={tooltipTop}
            unstyled
          >
            <table>
              {typeof tooltipLeft === "number" && (
                <caption>
                  {dateFormat.format(xScale.invert(tooltipLeft))}
                </caption>
              )}
              <tbody>
                {tooltipData?.map(({ color, scenario, payment }) => (
                  <tr key={scenario.id} style={{ color }}>
                    <th scope="row">{scenario.name}</th>
                    <td>{currencyFormat.format(payment[field])}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TooltipInPortal>
          <Line
            className={classes.tooltipLine}
            from={{ x: tooltipLeft, y: 0 }}
            pointerEvents="none"
            strokeWidth={2}
            to={{ x: tooltipLeft, y: height + margin.top }}
          />
        </>
      )}
      {scenarios.map(({ color, payments, scenario }) => {
        return (
          <LinePath<AmortizationPayment>
            curve={curveNatural}
            // LinePath expects a mutable array, but doesn't actually mutate it
            data={payments as AmortizationPayment[]}
            key={scenario.id}
            x={(d) => xScale(d.date)}
            y={(d) => yScale(d[field])}
            stroke={color}
            fill="transparent"
          />
        );
      })}
    </svg>
  );
};

export default withProfiler(ComparisonChart, {
  name: "ComparisonChart",
});

const currencyFormat = new Intl.NumberFormat("en-US", {
  currency: "USD",
  style: "currency",
});

const dateFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  timeZone: "UTC",
  year: "numeric",
});
