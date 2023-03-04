import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import useStyles from './styles';
import memories from '../../images/memories.png';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LOGOUT } from '../../reduxx/types';

const Navbar = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  useEffect(() => {
    const credential = user?.credential;

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location, user?.credential]);

  const onLogOut = () => {
    dispatch({ type: LOGOUT });
    // navigate('/');
    setUser(null);
  };

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Link to={'/'}>
          <Typography className={classes.heading} variant="h2" align="center">
            Memories
          </Typography>
        </Link>
        <img
          src={memories}
          alt="memories"
          height="60"
          className={classes.image}
        />
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user?.dataLogin.name}
              src={user?.dataLogin.picture}
            >
              {user?.dataLogin.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user.dataLogin.name}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={onLogOut}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/auth')}
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
