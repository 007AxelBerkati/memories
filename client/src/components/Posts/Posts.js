import { CircularProgress, Grid } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import Post from './Post/Post';

import useStyles from './styles';

const Posts = () => {
  const classes = useStyles();
  const { loading, posts } = useSelector((state) => state.post);

  return loading ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={6}>
          <Post post={post} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
