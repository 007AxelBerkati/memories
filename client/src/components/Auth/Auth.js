import { Avatar, Container, Paper } from '@material-ui/core';
import React from 'react';
import useStyles from './styles';
// import LockOutlinedIcon from '@material-ui/icons';

const Auth = () => {
  const classes = useStyles();
  return (
    <Container component={'main'} maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>{/* <LockOutlinedIcon /> */}</Avatar>
      </Paper>
    </Container>
  );
};

export default Auth;
