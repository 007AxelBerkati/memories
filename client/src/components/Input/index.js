import React from 'react';
import { TextField, Grid, InputAdornment, IconButton } from '@material-ui/core';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import useStyles from './styles';

const Input = ({
  half,
  name,
  label,
  handleChange,
  autoFocus,
  type,
  handleShowPassword,
}) => {
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField
        name={name}
        label={label}
        onChange={handleChange}
        className={classes.input}
        variant="outlined"
        required
        fullWidth
        autoFocus={autoFocus}
        type={type}
        InputProps={
          name === 'password'
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword}>
                      {type === 'password' ? (
                        <Visibility style={{ color: '#2A86FF' }} />
                      ) : (
                        <VisibilityOff style={{ color: '#2A86FF' }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : null
        }
        inputProps={{ style: { color: 'white' } }}
      />
    </Grid>
  );
};

export default Input;
