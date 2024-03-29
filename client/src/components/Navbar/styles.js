import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 50px',
    backgroundColor: '#27282F',
  },
  heading: {
    color: '#FFFFFF',
    textDecoration: 'none',
  },
  image: {
    marginLeft: '15px',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '400px',
  },

  profile: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px',
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
    color: '#FFFFFF',
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },

  small: {
    width: '200px',
  },

  large: {
    width: '400px',
  },
}));
