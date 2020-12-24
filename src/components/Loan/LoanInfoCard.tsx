import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import ExploreIcon from "@material-ui/icons/Explore";
import * as React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import type { Loan } from "../../hooks/useLoans";

interface LoanInfoCardProps {
  loan: Loan | null;
  onDeleteClick(): void;
  onEditClick(): void;
}

const LoanInfoCard: React.FC<LoanInfoCardProps> = ({
  loan,
  onDeleteClick,
  onEditClick,
}) => {
  const classes = useStyles();
  const match = useRouteMatch();

  // const totalPrincipalPaid = loan.payments.reduce(
  //   (prev, curr) => prev + curr.principal,
  //   0,
  // );
  // const totalInterestPaid = loan.payments.reduce(
  //   (prev, curr) => prev + curr.interest,
  //   0,
  // );
  // const totalPaid = totalPrincipalPaid + totalInterestPaid;
  // const principalBalance = loan.loanAmount - totalPrincipalPaid;
  return (
    <>
      <Card>
        <CardContent className={classes.content}>
          <List component="div" dense disablePadding>
            <ListItem component="div">
              <ListItemText
                primary="Loan amount"
                secondary={
                  loan ? currencyFormat.format(loan.loanAmount) : "$xxx,xxx.xx"
                }
                secondaryTypographyProps={{
                  "aria-hidden": !loan,
                  className: loan ? "" : classes.listItemLoading,
                }}
              />
            </ListItem>
            <ListItem component="div">
              <ListItemText
                primary="Years"
                secondary={loan ? numberFormat.format(loan.periods / 12) : "xx"}
                secondaryTypographyProps={{
                  className: loan ? "" : classes.listItemLoading,
                }}
              />
            </ListItem>
            <ListItem component="div">
              <ListItemText
                primary="Annual interest rate"
                secondary={
                  loan
                    ? percentFormat.format(loan.periodInterestRate * 12)
                    : "x.x%"
                }
                secondaryTypographyProps={{
                  "aria-hidden": !loan,
                  className: loan ? "" : classes.listItemLoading,
                }}
              />
            </ListItem>
            <ListItem component="div">
              <ListItemText
                primary="Start date"
                secondary={
                  loan ? dateFormat.format(loan.startDate) : "xxxx xxxx"
                }
                secondaryTypographyProps={{
                  "aria-hidden": !loan,
                  className: loan ? "" : classes.listItemLoading,
                }}
              />
            </ListItem>
          </List>
          {/* <List component="div" dense disablePadding>
            <ListItem component="div">
              <ListItemText
                primary="Principal balance"
                secondary={currencyFormat.format(principalBalance)}
              />
            </ListItem>
            <ListItem component="div">
              <ListItemText
                primary="Total principal paid"
                secondary={currencyFormat.format(totalPrincipalPaid)}
              />
            </ListItem>
            <ListItem component="div">
              <ListItemText
                primary="Total interest paid"
                secondary={currencyFormat.format(totalInterestPaid)}
              />
            </ListItem>
            <ListItem component="div">
              <ListItemText
                primary="Total paid"
                secondary={currencyFormat.format(totalPaid)}
              />
            </ListItem>
          </List> */}
        </CardContent>
        <CardActions>
          <Button
            color="primary"
            component={Link}
            size="small"
            to={`${match.url}/explore`}
          >
            <ExploreIcon className={classes.buttonIcon} />
            Explore
          </Button>
          <Button color="primary" onClick={onEditClick} size="small">
            <EditIcon className={classes.buttonIcon} />
            Edit
          </Button>
          <Button color="secondary" onClick={onDeleteClick} size="small">
            <DeleteIcon className={classes.buttonIcon} />
            Delete
          </Button>
        </CardActions>
      </Card>
    </>
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

const useStyles = makeStyles((theme) => ({
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
  listItemLoading: {
    display: "inline-block",
    backgroundColor: theme.palette.text.secondary,
    borderRadius: theme.shape.borderRadius,
    color: "transparent",
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    opacity: 0.5,
    userSelect: "none",
  },
}));

export default LoanInfoCard;
