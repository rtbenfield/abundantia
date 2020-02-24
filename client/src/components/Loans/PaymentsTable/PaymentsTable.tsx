import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableFooter,
  TablePagination,
  makeStyles,
} from "@material-ui/core";
import * as React from "react";
import { Payment } from "../../../hooks/useLoan";

interface PaymentsTableProps {
  payments: readonly Payment[];
}

const LoanOverview: React.FC<PaymentsTableProps> = ({ payments }) => {
  const classes = useStyles();
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);
  return (
    <div className={classes.root}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">Principal</TableCell>
            <TableCell align="right">Interest</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {payments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(p => (
            <TableRow key={p.id}>
              <TableCell>{dateFormat.format(p.date)}</TableCell>
              <TableCell align="right">{currencyFormat.format(p.interest + p.principal)}</TableCell>
              <TableCell align="right">{currencyFormat.format(p.principal)}</TableCell>
              <TableCell align="right">{currencyFormat.format(p.interest)}</TableCell>
            </TableRow>
          ))}
          {payments.length === 0 && (
            <TableRow>
              <TableCell align="center" colSpan={1000}>
                No payments have been added
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              backIconButtonProps={{
                "aria-label": "previous page",
              }}
              count={payments.length}
              nextIconButtonProps={{
                "aria-label": "next page",
              }}
              onChangePage={(_, v) => setPage(v)}
              onChangeRowsPerPage={e => {
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
    </div>
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

const useStyles = makeStyles({
  root: {
    overflowX: "auto",
  },
});

export default LoanOverview;
