import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import * as React from "react";
import type { Loan } from "../../hooks/useLoans";
import { makeAmortizationSchedule } from "./utils";

interface AmortizationTableProps {
  loan: Loan;
}

const AmortizationTable: React.FC<AmortizationTableProps> = ({ loan }) => {
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const paymentSchedule = React.useMemo(() => {
    return makeAmortizationSchedule(loan);
  }, [loan]);

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Payment</TableCell>
            <TableCell>Date</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">Principal</TableCell>
            <TableCell align="right">Interest</TableCell>
            <TableCell align="right">Balance</TableCell>
            {/* <TableCell></TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {paymentSchedule
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((p, i, a) => {
              // const next = a[i + 1];
              // const paid = loan.payments.some(x => x.date >= p.date && (!next || x.date < next.date));

              return (
                <TableRow key={p.paymentNumber}>
                  <TableCell>{numberFormat.format(p.paymentNumber)}</TableCell>
                  <TableCell>{dateFormat.format(p.date)}</TableCell>
                  <TableCell align="right">
                    {currencyFormat.format(p.amount)}
                  </TableCell>
                  <TableCell align="right">
                    {currencyFormat.format(p.principal)}
                  </TableCell>
                  <TableCell align="right">
                    {currencyFormat.format(p.interest)}
                  </TableCell>
                  <TableCell align="right">
                    {currencyFormat.format(p.balance)}
                  </TableCell>
                  {/* <TableCell>
                  <IconButton
                    disabled={paid || loading}
                    onClick={() =>
                      createPayment({
                        variables: {
                          id: loan.id,
                          payment: {
                            date: p.date.toISOString(),
                            interest: p.interest,
                            principal: p.principal,
                            note: `Created for payment #${p.paymentNumber}`,
                          },
                        },
                      })
                    }
                    size="small"
                    title={paid ? "Paid" : "Mark as Paid"}
                  >
                    <DoneIcon />
                  </IconButton>
                </TableCell> */}
                </TableRow>
              );
            })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              backIconButtonProps={{
                "aria-label": "previous page",
              }}
              count={paymentSchedule.length}
              nextIconButtonProps={{
                "aria-label": "next page",
              }}
              onPageChange={(_, v) => setPage(v)}
              onRowsPerPageChange={(e) => {
                setRowsPerPage(+e.target.value);
                setPage(0);
              }}
              page={page}
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={[5, 10, 25]}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

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

const numberFormat = new Intl.NumberFormat("en-US");

export default AmortizationTable;
