import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    color: "#fff",
  },
  title: {
    flexGrow: 1,
  },
}));

const MainNav = () => {
  const history = useHistory();
  const classes = useStyles();
  return (
    <div>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Admin Panel
          </Typography>
          {window.location.pathname != "/" && (
            <Button
              variant="standard"
              classes={{ root: classes.menuButton }}
              color="primary"
              onClick={(e) => {
                e.preventDefault();
                sessionStorage.clear();
                history.replace("/");
              }}
            >
              log out
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default MainNav;
