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
  import { useState } from "react";
  import { useAuth } from "../../AuthContext";
  
  import useStyles from "./styles";

   const ForgotPassword = () => {
    const navigate = useNavigate()
    const classes = useStyles();
  
    const { login } = useAuth();
    const isDesktop = useMediaQuery(`(min-width:800px)`);
  
    const [ loading, setLoading] = useState(false)
    const [ error, setError] = useState('')
    const [formData, setFormData] = useState({
      email: "",
      password: "",
    });
  
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
        await login(formData.email, formData.password);
        setFormData({
          email: "",
          password: "",
        })
      navigate("/")
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
            style={{ width: isDesktop ? "25%" : "80%" }}
          >
            <Box className={classes.contentContainer}>
              { error && <p>{error}</p>}
              <Typography variant="h4" className={classes.formTitle}>
                Curious Prawn
              </Typography>
              <Typography variant="subtitle1" className={classes.formTitle}>
              Enter your email, phone, or username and we'll send you a link to get back into your account.
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
              <Typography variant="subtitle1">
                back to
              <Link to="../../Forgotpassword" className={classes.forgot}>
                Login
              </Link>
              </Typography>
              <Box className={classes.bottomBox}>
                <Typography>Don't have an account? <Link to="../Signup/" className={classes.link} >Sign Up </Link></Typography>
              </Box>
              
            </Box>
          
          </div>
        </div>
      </>
    );
  };
  
export default ForgotPassword