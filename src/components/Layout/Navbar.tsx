import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { auth } from "firebase/app";
import * as React from "react";
import { useUser } from "../../hooks/useUser";

interface NavbarProps {
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const classes = useStyles();
  const user = useUser();

  async function handleSignOut() {
    await auth().signOut();
  }

  return (
    <AppBar className={className} position="relative">
      <Toolbar>
        <Typography
          className={classes.title}
          color="inherit"
          noWrap
          variant="h6"
        >
          Abundantia
        </Typography>
        {user && (
          <IconButton color="inherit" onClick={handleSignOut} title="Sign out">
            <ExitToAppIcon />
          </IconButton>
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
