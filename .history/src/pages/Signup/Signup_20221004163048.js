import {
  Typography,
  FormControl,
  Box,
  Input,
  InputLabel,
  Button,
  useMediaQuery,
  
} from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../AuthContext";

import useStyles from "./styles";
import { sendEmailVerification, getAuth, sendSignInLinkToEmail } from "firebase/auth";
const SignUp = () => {
  const classes = useStyles();
  const navigate = useNavigate()
  const { signUp} = useAuth();
  const isDesktop = useMediaQuery(`(min-width:800px)`);
  const auth = getAuth();
  const [ loading, setLoading] = useState(false)
  const [ error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [formData, setFormData] = useState({
    email: "",
    fullname: "",
    username: "",
    password: "",
  });

  
    // useEffect(() => {

    //   sendEmailVerification(auth.currentUser) 
    //       .then(() => {
    //         const text = "Email Sent"
    //           setMessage(text)
    //       })
      
    // }, [])

    async function signInEmailLink() {
      const actionCodeSettings = {
        url: navigate('/')
      } 
    try {
        await sendSignInLinkToEmail(auth, email, actionCodeSettings);
        setMessage('email sent');
        window.localStorage.setItem('emailForSignIn', email);
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
      }
    }
  

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
      setError('')
      setLoading(true)
      await signUp(formData.email, formData.password);
      await signInEmailLink()
      // await sendEmailVerification(auth.currentUser)
      // .then(() => {
      //   setMessage('Email Sent')
      // })

      setFormData({
        email: "",
        fullname: "",
        username: "",
        password: "",
      })
    
    }
    catch {
      setError('Failed to setup account')
     
    }
    setLoading(false)
  }


  return (
    <>
      <div className={classes.signUpBody}>
        <div
          className={classes.signContainer}
          style={{ width: isDesktop ? "25%" : "66%" }}
        >
          <Box className={classes.contentContainer}>
            { message && <p>{message}</p>}
            { error && <p>{error}</p>}
            <Typography variant="h4" className={classes.formTitle}>
              Curious Prawn
            </Typography>
            <Typography vairant="subtitle2" className={classes.formSubtitle}>
              Sign up to find your favorite restaurants
            </Typography>
            <form display="flex" flexdirection="column" onSubmit={handleSubmit}>
              <FormControl className={classes.formContent}>
                <InputLabel htmlFor="email">Email Address</InputLabel>
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
              <FormControl className={classes.formContent}>
                <InputLabel htmlFor="fullname">Full Name</InputLabel>
                <Input
                  className={classes.formInput}
                  id="fullname"
                  type="text"
                  name="fullname"
                  onChange={handleChange}
                  value={formData.fullname}
                  required
                />
              </FormControl>
              <FormControl className={classes.formContent}>
                <InputLabel htmlFor="username">Username</InputLabel>
                <Input
                  className={classes.formInput}
                  id="username"
                  type="text"
                  name="username"
                  onChange={handleChange}
                  value={formData.username}
                  required
                />
              </FormControl>
              <FormControl className={classes.formContent}>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  className={classes.formInput}
                  id="password"
                  type="password"
                  name="password"
                  onChange={handleChange}
                  value={formData.password}
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
                Sign Up
              </Button>
            </form>

            <Box>
              <Typography>Have an account? <Link to="../Login" className={classes.link} > Log in </Link></Typography>
            </Box>
          </Box>

        </div>
      </div>
    </>
  );
};

export default SignUp;
