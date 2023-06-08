import {
  AppBar,
  Avatar,
  Box,
  Button,
  Hidden,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import useStyles from './styles';
import memories from '../../assets/memories.png';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LOGOUT } from '../../reduxx/types';
import decode from 'jwt-decode';

const Navbar = () => {
  const classes = useStyles();
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const onLogOut = () => {
    dispatch({ type: LOGOUT });
    navigate('/auth');
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) onLogOut();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Link to={'/'} style={{ textDecoration: 'none' }}>
          <Hidden smDown>
            <Typography className={classes.heading} variant="h2" align="center">
              Memories
            </Typography>
          </Hidden>
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
          <Box
            className={`${classes.profile} ${
              isSmallScreen ? classes.small : classes.large
            } `}
          >
            <Avatar
              className={classes.purple}
              alt={user?.dataLogin.name}
              src={user?.dataLogin.picture}
            >
              {user?.dataLogin.name.charAt(0)}
            </Avatar>
            <Hidden smDown>
              <Typography className={classes.userName} variant="h6">
                {user.dataLogin.name}
              </Typography>
            </Hidden>
            <Button variant="contained" color="secondary" onClick={onLogOut}>
              Logout
            </Button>
          </Box>
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
