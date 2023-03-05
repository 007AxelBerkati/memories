import React from 'react';
import { Pagination, PaginationItem } from '@material-ui/lab';
import useStyles from './styles';
import { Link } from 'react-router-dom';

const Paginate = () => {
  const classes = useStyles();

  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={5}
      page={1}
      variant="outlined"
      color="primary"
      // shape="rounded"
      renderItem={(item) => (
        <PaginationItem
          {...item}
          classes={{ root: classes.root, page: classes.page }}
          component={Link}
          to={`/posts?page=${1}`}
        />
      )}
    ></Pagination>
  );
};

export default Paginate;
