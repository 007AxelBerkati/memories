import { Container } from '@material-ui/core';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Navbar } from './components';
import { Auth, Home } from './pages';

const App = () => {
  return (
    <BrowserRouter>
      <Container maxWidth={'lg'}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
