import React from "react";
import Card from "@material-ui/core/Card";
import { useFormik } from "formik";
import * as yup from "yup";
import Axios from "axios";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { Button, TextField, Box } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
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
const SignUp = () => {
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      fullname: yup
        .string()
        .matches(/^[a-z,A-Z,. ]+$/, "Special Characters not allowed")
        .required("Name is Required"),
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
        .trim("Empty space not allowed")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
          "Password must contain atleast One upperCase lower case and Special Character"
        )
        .matches(/^(\s*\S+\s*$)/, "Empty space not allowed")
        .min(8, "password must Contain minimum 8 characters")
        .max(13, "Maximum character limit is 13")
        .required("This field is required"),
    }),
  });
  const handleSignUp = () => {
    let payload = {
      email: formik.values.email,
      password: formik.values.password,
      userName: formik.values.fullname,
    };
    let options = {
      "content-Type": "application/json",
    };
    Axios.post("http://localhost:3000/register", payload, {
      headers: options,
    })
      .then((res) => {
        if (res.status == 201) {
          sessionStorage.setItem("token", res.accessToken);
          history.push("/Dashboard");
        } else {
          return Promise.reject(res);
        }
      })
      .catch((res) => {
        let dom = document.getElementById("error");
        dom.style.display = "block";
        dom.innerText = "Email Address already exist";
        dom.style.color = "red";
      });
  };
  const classes = useStyles();
  return (
    <div>
      <div className={classes.cardContainer}>
        <Card className={classes.root}>
          <Typography variant="h6" color="primary">
            Sign Up
          </Typography>
          <CardContent className={classes.CardContent}>
            <p id="error" style={{ display: "none" }}></p>
            <TextField
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              required
              id="fullname"
              name="fullname"
              label="Full Name"
              helperText={formik.errors.fullname}
              placeholder="John Peter"
              variant="outlined"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.fullname}
              error={formik.touched.fullname && formik.errors.fullname}
            />

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
              placeholder="johnpeter@gmail.com"
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
              variant="outlined"
              type="password"
              helperText={formik.errors.password}
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
                  handleSignUp();
                }}
              >
                JOIN NOW
              </Button>
            </Box>
          </CardActions>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;
