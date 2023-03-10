import { Container, Grid, Grow, Paper } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getPosts } from '../../reduxx/actions/posts';
import useStyles from './styles';
import { Form, Posts } from '../../components';
import { Paginate } from '../../components';

const Home = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);
  return (
    <Grow in>
      <Container>
        <Grid
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={4}
          className={classes.mainContainer}
        >
          <Grid item xs={12} sm={7}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            <Paper classes={classes.pagination} elevation={6}>
              <Paginate />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
