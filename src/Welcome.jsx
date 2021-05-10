import React, { useState } from "react";
import MainNav from "./MainNav";
import SignUp from "./SignUp";
import { makeStyles } from "@material-ui/core/styles";
import Login from "./Login";
import { Typography } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  Link: {
    color: "#3f51b5",
    cursor: "pointer",
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));
const Welcome = () => {
  const [toggleUser, setToggleUser] = useState();
  const classes = useStyles();
  const handleUser = () => {
    setToggleUser(!toggleUser);
  };
  return (
    <div>
      <MainNav />
      <div className={classes.toolbar}></div>

      {toggleUser ? <Login /> : <SignUp />}
      <Typography
        variant="body1"
        color="primary"
        style={{ color: "black", textAlign: "center", marginTop: "1rem" }}
      >
        {toggleUser ? "Click here to  " : " Already Have an Account ? "}
        <span onClick={handleUser} className={classes.Link}>
          {toggleUser ? "Sign up" : "login"}
        </span>
      </Typography>
    </div>
  );
};

export default Welcome;
