import { Button, Card, CardActions, CardContent, List, ListItem, ListItemText, makeStyles } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import ExploreIcon from "@material-ui/icons/Explore";
import * as React from "react";
import { Link } from "react-router-dom";
import { Loan } from "../../../hooks/useLoan";
import useDocumentTitle from "../../../hooks/useDocumentTitle";

interface LoanInfoCardProps {
  className?: string;
  deletePath: string;
  editPath: string;
  explorePath: string;
  loan: Loan;
}

const LoanInfoCard: React.FunctionComponent<LoanInfoCardProps> = ({
  deletePath,
  editPath,
  explorePath,
  loan,
  ...props
}) => {
  useDocumentTitle(loan.name);
  const classes = useStyles();
  const totalPrincipalPaid = loan.payments.reduce((prev, curr) => prev + curr.principal, 0);
  const totalInterestPaid = loan.payments.reduce((prev, curr) => prev + curr.interest, 0);
  const totalPaid = totalPrincipalPaid + totalInterestPaid;
  const principalBalance = loan.loanAmount - totalPrincipalPaid;

  return (
    <Card {...props}>
      <CardContent className={classes.content}>
        <List component="div" dense disablePadding>
          <ListItem component="div">
            <ListItemText primary="Loan amount" secondary={currencyFormat.format(loan.loanAmount)} />
          </ListItem>
          <ListItem component="div">
            <ListItemText primary="Years" secondary={numberFormat.format(loan.periods / 12)} />
          </ListItem>
          <ListItem component="div">
            <ListItemText
              primary="Annual interest rate"
              secondary={percentFormat.format(loan.periodInterestRate * 12)}
            />
          </ListItem>
          <ListItem component="div">
            <ListItemText primary="Start date" secondary={dateFormat.format(loan.startDate)} />
          </ListItem>
        </List>
        <List component="div" dense disablePadding>
          <ListItem component="div">
            <ListItemText primary="Principal balance" secondary={currencyFormat.format(principalBalance)} />
          </ListItem>
          <ListItem component="div">
            <ListItemText primary="Total principal paid" secondary={currencyFormat.format(totalPrincipalPaid)} />
          </ListItem>
          <ListItem component="div">
            <ListItemText primary="Total interest paid" secondary={currencyFormat.format(totalInterestPaid)} />
          </ListItem>
          <ListItem component="div">
            <ListItemText primary="Total paid" secondary={currencyFormat.format(totalPaid)} />
          </ListItem>
        </List>
      </CardContent>
      <CardActions>
        <Button color="primary" component={Link as any} {...{ to: explorePath }} size="small">
          <ExploreIcon className={classes.buttonIcon} />
          Explore
        </Button>
        <Button color="primary" component={Link as any} {...{ to: editPath }} size="small">
          <EditIcon className={classes.buttonIcon} />
          Edit
        </Button>
        <Button color="secondary" component={Link as any} {...{ to: deletePath }} size="small">
          <DeleteIcon className={classes.buttonIcon} />
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

const currencyFormat = new Intl.NumberFormat("en-US", {
  currency: "USD",
  style: "currency",
});

const dateFormat = new Intl.DateTimeFormat("en-US", {
  month: "long",
  timeZone: "UTC",
  year: "numeric",
});

const numberFormat = new Intl.NumberFormat("en-US");

const percentFormat = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 5,
  style: "percent",
});

const useStyles = makeStyles(theme => ({
  buttonIcon: {
    marginRight: theme.spacing(1),
  },
  content: {
    display: "grid",
    gridTemplateColumns: "1fr",
    [theme.breakpoints.up("md")]: {
      gridTemplateColumns: "1fr 1fr",
    },
  },
}));

export default LoanInfoCard;
