import './App.css';
import SideBar from './components/SideBar';
import { Route,BrowserRouter as Router,Routes } from 'react-router-dom';
import Rank from './pages/Rank';
import Result from './pages/Result';
import { ThemeProvider } from '@emotion/react';
import { thema } from './thema/thema';
import { CssBaseline } from '@mui/material';
import ResultDetail from './pages/ResultDetail';
import ClubDetail from './pages/ClubDetail';
import Practice from './pages/Practice';


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
          <Route path='result/:id'element={<ResultDetail/>}/>
          <Route path='clubDetail' element={<ClubDetail/>}/>
          <Route path='a1' element={<Practice/>}/>
        </Route>
      </Routes>
    </Router>
    </ThemeProvider>
  )
}

export default App;
