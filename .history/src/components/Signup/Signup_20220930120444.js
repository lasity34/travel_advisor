import {
  Typography,
  FormControl,
  Box,
  Input,
  InputLabel, Button
} from "@material-ui/core";

import useStyles from "./styles";
const SignUp = () => {
  const classes = useStyles();

  return (
    <>
      <Box display="flex" flexDirection="column" className={classes.container}>
        <Box className={classes.contentContainer}>
          <Typography variant="h4">Curious Prawn</Typography>
          <Typography vairant="subtitle2">
            Sign up to find your favorite restaurants
          </Typography>
          <Box display="flex" flexDirection="column">
            <FormControl className={classes.formContent}>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input className={classes.formInput} id="email" type="email" />
            </FormControl>
            <FormControl className={classes.formContent}>
              <InputLabel htmlFor="fullname">Full Name</InputLabel>
              <Input className={classes.formInput} id="fullname" type="text" />
            </FormControl>
            <FormControl className={classes.formContent}>
              <InputLabel htmlFor="username">Username</InputLabel>
              <Input
                className={classes.formInput}
                id="username"
                type="text"
                style={{ border: "1px solid black" }}
              />
            </FormControl>
            <FormControl className={classes.formContent}>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                className={classes.formInput}
                id="password"
                type="password"
                style={{ border: "1px solid black" }}
              />
            </FormControl>
            <Button variant="contained" className={classes.button}>
                SignUp
            </Button>
          </Box>

          <Box>
            <Typography></Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SignUp;
