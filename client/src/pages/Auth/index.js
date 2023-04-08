import {
  Avatar,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../components';
import { useForm } from '../../hooks';
import { signIn, signUp } from '../../reduxx/actions/auth';
import { AUTH } from '../../reduxx/types';
import useStyles from './styles';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [form, setForm] = useForm(initialState);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignUp) {
      dispatch(signUp(form, navigate));
    } else {
      dispatch(signIn(form, navigate));
    }
  };

  const handleChange = (e) => {
    setForm([e.target.name], e.target.value);
  };

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const switchMode = () => {
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
    setShowPassword(false);
  };

  const googleSuccess = async (credentialResponse) => {
    const credential = credentialResponse?.credential;
    const dataLogin = jwt_decode(credential);

    try {
      dispatch({ type: AUTH, data: { dataLogin, credential } });
      navigate('/');
    } catch (error) {}
  };

  const googleFailed = () => {
    console.log('Login Failed');
  };

  return (
    <Container component={'main'} maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignUp ? 'Sign up' : 'Sign in'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? 'text' : 'password'}
              handleShowPassword={handleShowPassword}
            />
            {isSignUp && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </Button>
          <GoogleLogin onSuccess={googleSuccess} onError={googleFailed} />
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode} color="primary">
                {isSignUp ? 'Already have an account ? Sign In ' : 'Sign Up'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
