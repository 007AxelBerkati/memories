import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  input: {
    backgroundColor: '#27282F',
    '& label': {
      color: '#94959C',
    },
    '& label.Mui-focused': {
      color: '#94959C',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'yellow',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#31323B',
      },
      '&:hover fieldset': {
        borderColor: 'white',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'blue',
      },
    },
  },
}));
