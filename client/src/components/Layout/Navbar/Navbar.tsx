import { AppBar, IconButton, makeStyles, Toolbar, Typography } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import * as Sentry from "@sentry/browser";
import * as React from "react";
import ReactGA from "react-ga";
import { GoogleLogout } from "react-google-login";
import { useUserContext } from "../../../contexts/userContext";

interface NavbarProps {
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const classes = useStyles();
  const userContext = useUserContext();
  return (
    <AppBar className={className} position="relative">
      <Toolbar>
        <Typography className={classes.title} color="inherit" noWrap variant="h6">
          Loan Rover
        </Typography>
        {userContext.isAuthenticated && (
          <GoogleLogout
            clientId={process.env.GOOGLE_CLIENT_ID || ""}
            onLogoutSuccess={() => {
              ReactGA.event({
                category: "logout",
                action: "Logout using Google Login",
              });
              userContext.clearUser();
            }}
            render={props => (
              <IconButton color="inherit" aria-label="sign out" {...props}>
                <ExitToAppIcon />
              </IconButton>
            )}
          />
        )}
      </Toolbar>
    </AppBar>
  );
};

const useStyles = makeStyles({
  menuIconButton: {
    marginLeft: "-12px",
    marginRight: "20px",
  },
  title: {
    flex: 1,
  },
});

export default Navbar;
