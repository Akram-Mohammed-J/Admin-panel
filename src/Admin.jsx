import React, { useState, useEffect } from "react";
import MainNav from "./MainNav";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button, Drawer, TextField, IconButton, Box } from "@material-ui/core";
import Axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import { Alert } from "@material-ui/lab";
import Collapse from "@material-ui/core/Collapse";
import CloseIcon from "@material-ui/icons/Close";
const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  table: {
    margin: "0 auto",
    width: "fit-content",
  },
  tableContainer: {},
  MuiDrawer_paper: {
    width: "fit-content",
  },
  TextFieldStyle: {
    width: "300px",
    marginBottom: "1rem",
  },
}));
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [deleteError, setDeleteError] = useState(false);
  const [id, setId] = useState();
  const [reload, setReload] = useState(false);
  useEffect(() => {
    let options = {
      "content-Type": "application/json",
    };
    Axios.get("http://localhost:3000/users", null, {
      headers: options,
    })
      .then((res) => {
        if (res.status == 200) {
          console.log(res);
          setUsers(res.data);
        } else {
          return Promise.reject(res);
        }
      })
      .catch((res) => {
        console.log(res);
      });
  }, [reload]);
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
  const handleDelete = (data) => {
    let options = {
      "content-Type": "application/json",
    };
    Axios.delete(`http://localhost:3000/users/${data.id}`, {
      headers: options,
    }).then((res) => {
      if (res.status == 200) {
        setReload(!reload);
        setDeleteSuccess(true);
        console.log(res);
      } else {
        setDeleteError(true);
        return Promise.reject(res);
      }
    });
  };
  const handleUpdate = (data) => {
    let payload = {
      email: formik.values.email,
      password: formik.values.password,
      userName: formik.values.fullname,
    };
    let options = {
      "content-Type": "application/json",
    };
    Axios.put(`http://localhost:3000/users/${id}`, payload, {
      headers: options,
    }).then((res) => {
      if (res.status == 200) {
        setSuccess(true);
        setReload(!reload);
        console.log(res);
      } else {
        return Promise.reject(res);
      }
    });
  };
  const classes = useStyles();
  return (
    <div>
      <MainNav />
      <div className={classes.toolbar}></div>
      <div className={classes.tableContainer}>
        <TableContainer component={Paper} className={classes.table}>
          <Collapse in={deleteSuccess}>
            <Alert
              style={{ marginBottom: "1rem" }}
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setDeleteSuccess(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              User Deleted Sucessfully
            </Alert>
          </Collapse>
          <Collapse in={deleteError}>
            <Alert
              style={{ marginBottom: "1rem" }}
              action={
                <IconButton
                  aria-label="close"
                  color="error"
                  size="small"
                  onClick={() => {
                    setDeleteError(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              Something went wrong
            </Alert>
          </Collapse>
          <Table style={{ width: "fit-content" }}>
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">User Id</StyledTableCell>
                <StyledTableCell align="center">Email</StyledTableCell>
                <StyledTableCell align="center">User Name</StyledTableCell>
                <StyledTableCell align="cemter">Update</StyledTableCell>
                <StyledTableCell align="cemter">Delete</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((data) => (
                <StyledTableRow>
                  <TableCell align="center">{data.id}</TableCell>
                  <TableCell align="center">{data.email}</TableCell>
                  <TableCell align="center">{data.userName}</TableCell>
                  <TableCell align="center">
                    <Button
                      size="small"
                      color="primary"
                      variant="contained"
                      onClick={() => {
                        setOpen(true);
                        setId(data.id);
                      }}
                    >
                      Update
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      size="small"
                      color="primary"
                      variant="contained"
                      onClick={() => {
                        handleDelete(data);
                      }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                  <TableCell align="center"></TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <div>
        <Drawer
          anchor="left"
          open={open}
          onClose={() => setOpen(false)}
          classes={{ paper: classes.MuiDrawer_paper }}
        >
          <div style={{ marginBottom: "1rem" }}>
            <IconButton>
              <CloseRoundedIcon
                onClick={() => {
                  setOpen(false);
                }}
              />
            </IconButton>
          </div>
          <div
            style={{
              padding: "1rem",
              justifyContent: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Collapse in={success}>
              <Alert
                style={{ marginBottom: "1rem" }}
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setSuccess(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
              >
                User Updated Sucessfully
              </Alert>
            </Collapse>
            <Collapse in={error}>
              <Alert
                style={{ marginBottom: "1rem" }}
                action={
                  <IconButton
                    aria-label="close"
                    color="error"
                    size="small"
                    onClick={() => {
                      setError(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
              >
                Something went wrong
              </Alert>
            </Collapse>
            <Box className={classes.TextFieldStyle}>
              <TextField
                className={classes.TextFieldStyle}
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
            </Box>

            <Box className={classes.TextFieldStyle}>
              <TextField
                className={classes.TextFieldStyle}
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
            </Box>
            <Box className={classes.TextFieldStyle}>
              <TextField
                className={classes.TextFieldStyle}
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
            </Box>
            <Box style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                disabled={!(formik.isValid && formik.dirty)}
                size="small"
                color="primary"
                variant="contained"
                onClick={() => {
                  handleUpdate();
                }}
              >
                Update
              </Button>
            </Box>
          </div>
        </Drawer>
      </div>
    </div>
  );
};

export default Admin;
