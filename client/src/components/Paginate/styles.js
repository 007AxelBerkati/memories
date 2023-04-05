import { makeStyles } from '@material-ui/styles';

export default makeStyles((theme) => ({
  ul: {
    justifyContent: 'space-around',

    '& .MuiPaginationItem-root': {
      color: '#fff',
      borderColor: '#fff',
    },
    '& .Mui-selected': {
      backgroundColor: '#fff',
      color: '#000',
    },
  },
}));
