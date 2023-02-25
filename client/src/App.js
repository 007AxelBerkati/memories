import React from 'react'
import {AppBar, Container, Grid, Grow, Typography} from  '@material-ui/core'
import memories from './images/memories.png'
import Posts from './components/Posts/Posts'
import Form from './components/Form/Form'

const App = () => {
  return (
    <Container maxWidth={'lg'}>
      <AppBar position='static' color='inherit'>
        <Typography variant='h2' align='center'>
          Memories
        </Typography>
        <img 
          src={memories}
          alt='memories'
          height='60'
        />
      </AppBar>
      <Grow in>
        <Container>
          <Grid container justifyContent='space-between' alignItems='stretch' spacing={4}>
            <Grid item xs={12} sm={7}>
              <Posts />

              </Grid>
            <Grid item xs={12} sm={7}>
              <Form />

              </Grid>
          </Grid>
        </Container>
      </Grow>

    </Container>
  )
}

export default App