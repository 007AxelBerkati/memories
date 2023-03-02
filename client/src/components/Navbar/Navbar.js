import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import React from 'react';
import useStyles from './styles';
import memories from '../../images/memories.png';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const classes = useStyles();

  const user = null;

  const navigate = useNavigate();
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
            <Typography className={classes.userName} variant="h6">
              {user.result.name}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
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
