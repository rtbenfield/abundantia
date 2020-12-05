import { useAuth0 } from "@auth0/auth0-react";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import * as React from "react";

interface NavbarProps {
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const { logout, user } = useAuth0();
  const classes = useStyles();

  return (
    <AppBar className={className} position="relative">
      <Toolbar>
        <Typography
          className={classes.title}
          color="inherit"
          component="span"
          noWrap
          variant="h6"
        >
          Abundantia
        </Typography>
        {user && (
          <>
            <Typography color="inherit" component="span" noWrap variant="body1">
              {user.name}
            </Typography>
            <IconButton
              color="inherit"
              onClick={() => logout()}
              title="Sign out"
            >
              <ExitToAppIcon />
            </IconButton>
          </>
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
