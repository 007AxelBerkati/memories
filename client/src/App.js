import { Container } from '@material-ui/core';
import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Navbar, PostDetails, CreatorOrTag } from './components';
import { Auth, Home } from './pages';

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <BrowserRouter>
      <Container maxWidth={'xl'}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/posts" replace />} />
          <Route path="/posts" element={<Home />} />
          <Route path="/posts/search" element={<Home />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path={'/creators/:name'} element={<CreatorOrTag />} />
          <Route path={'/tags/:name'} element={<CreatorOrTag />} />
          <Route
            path="/auth"
            element={!user ? <Auth /> : <Navigate to={'/posts'} />}
          />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
