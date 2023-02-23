/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Navbar from './components/Navbar';
import Routes from './Routes';

function App() {
  return (
    <>
      <CssBaseline />
      <Navbar />
      <Container maxWidth="md">
        <Routes />
      </Container>
    </>
  );
}

export default App;
