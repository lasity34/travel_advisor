import {
  Typography,
  FormControl,
  Box,
  Input,
  InputLabel,
  Button,
  useMediaQuery,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../AuthContext";

import useStyles from "./styles";

const ForgotPassword = () => {
  const classes = useStyles();

  const { resetPassword } = useAuth();
  const isDesktop = useMediaQuery(`(min-width:800px)`);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
  });
  const [message, setMessage] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await resetPassword(formData.email);
      setFormData({
        email: "",
      });
      setMessage("See mailbox for further instructions");
    } catch (error){
      setError(error.message);
      setMessage("");
    }
    setLoading(false);
  }

  return (
    <>
      <div className={classes.signUpBody}>
        <div
          className={classes.signContainer}
          style={{ width: isDesktop ? "25%" : "80%" }}
        >
          <Box className={classes.contentContainer}>
            {message && <p className={classes.colorSign}>{message}</p>}
            {error && <p>{error}</p>}
            <Typography variant="h4" className={classes.formTitle}>
              Curious Prawn
            </Typography>
            <Typography variant="subtitle1" className={classes.formTitle}>
              Enter your email and we'll send you a link to get back into your
              account.
            </Typography>
            <form display="flex" flexdirection="column" onSubmit={handleSubmit}>
              <FormControl className={classes.formContent}>
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input
                  className={classes.formInput}
                  id="email"
                  type="email"
                  name="email"
                  onChange={handleChange}
                  value={formData.email}
                  required
                />
              </FormControl>

              <Button
                type="submit"
                sx={{
                  display: "flex",
                }}
                variant="contained"
                className={classes.button}
                disabled={loading}
              >
                Send Link
              </Button>
            </form>

            <Link to="../../Login" className={classes.forgot}>
              Back To Login
            </Link>

            <Box className={classes.bottomBox}>
              <Typography className={classes.accountText} variant="subtitle1">
                Don't have an account?
              </Typography>
              <Link to="../Signup" className={classes.link}>
                Sign Up
              </Link>
            </Box>
          </Box>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
