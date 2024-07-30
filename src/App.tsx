import React, { useState } from 'react';
import './App.css';
import SideBar from './components/SideBar';
import { Box, Toolbar } from '@mui/material';
import { Route,BrowserRouter as Router,Routes } from 'react-router-dom';
import Rank from './pages/Rank';
import Result from './pages/Result';
import { ThemeProvider } from '@emotion/react';
import { thema } from './thema/thema';
import { CssBaseline } from '@mui/material';

const drawerWidth=240;


const App = () => {
  return (
<ThemeProvider theme={thema}>
<CssBaseline/>
    <Router>
      <Routes>
        <Route path="/" element={<SideBar/>}>
        <Route index element={<Rank/>}/>
        <Route path='/result' element={<Result/>}/>
        </Route>
      </Routes>
    </Router>
    </ThemeProvider>
  )
}

export default App;
