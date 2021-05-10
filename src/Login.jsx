import React from "react";
import Card from "@material-ui/core/Card";
import { useFormik } from "formik";
import * as yup from "yup";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import { Button, TextField, Box } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  root: {
    padding: "1rem",
    width: 345,
  },
  media: {
    height: 140,
  },
  cardContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  textField: {
    marginBottom: "1rem",
  },
  CardContent: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  },
});
const Login = () => {
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .matches(
          /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
          "Enter a valid Email Address"
        )
        .strict()
        .trim()
        .required("Email is Required"),
      password: yup
        .string()
        .strict()
        .trim("Empty Space  not allowed")
        .required("Password is required"),
    }),
  });
  const handleLogin = () => {
    let payload = {
      email: formik.values.email,
      password: formik.values.password,
    };
    let options = {
      "content-Type": "application/json",
    };
    Axios.post("http://localhost:3000/login", payload, {
      headers: options,
    })
      .then((res) => {
        if (res.status == 200) {
          sessionStorage.setItem("token", res.accessToken);
          history.push("/Admin");
        } else if (
          res.status == 200 &&
          formik.values.email == "akrammohammed.j@gmail.com" &&
          formik.values.password == "Qwerty@1234"
        ) {
          sessionStorage.setItem("token", res.accessToken);
          history.push("/Admin");
        } else {
          return Promise.reject(res);
        }
      })
      .catch((res) => {
        let dom = document.getElementById("error");
        dom.style.display = "block";
        dom.innerText = "Invalid Credentials";
        dom.style.color = "red";
      });
  };
  const classes = useStyles();
  return (
    <div>
      <div className={classes.cardContainer}>
        <Card className={classes.root}>
          <Typography variant="h6" color="primary">
            Login
          </Typography>
          <CardContent className={classes.CardContent}>
            <p id="error" style={{ display: "none" }}></p>
            <TextField
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              required
              id="email"
              name="email"
              label="Email"
              helperText={formik.errors.email}
              placeholder="Enter Your Email Address"
              variant="outlined"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
              error={formik.touched.email && formik.errors.email}
            />
            <TextField
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              required
              id="password"
              name="password"
              label="Password"
              helperText={formik.errors.password}
              type="password"
              placeholder="Enter Your Password"
              variant="outlined"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.password}
              error={formik.touched.password && formik.errors.password}
            />
          </CardContent>

          <CardActions>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="flex-end"
              width="100%"
            >
              <Button
                disabled={!(formik.isValid && formik.dirty)}
                size="small"
                color="primary"
                variant="contained"
                onClick={() => {
                  handleLogin();
                }}
              >
                Login
              </Button>
            </Box>
          </CardActions>
        </Card>
      </div>
    </div>
  );
};

export default Login;
