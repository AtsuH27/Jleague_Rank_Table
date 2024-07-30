import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Outlet, useNavigate } from 'react-router-dom';
import TableRowsIcon from '@mui/icons-material/TableRows';
import ScoreboardIcon from '@mui/icons-material/Scoreboard';
import J1logoIcon from "./logo.png";
import Logo from "../images/jleague-logo/logo.png"
import Logo2019 from "../images/jleague-logo/j-logo-2019-present.png";
import './SideBar.css';




const drawerWidth = 240;

export default function PermanentDrawerLeft() {
  
  const navigate = useNavigate();
  
  const handleListItemClick=(index:number)=>{
    if(index===0){
      navigate('/')
    }else if(index === 1){
      navigate('/result');
    }
  };



  return (
    <Box sx={{ display: 'flex',bgcolor:(thema)=>thema.palette.grey[900] }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, 
        ml: `${drawerWidth}px`,
        backgroundColor:'#333333'
      }}
      >
        <Toolbar className='toolbar'>
        
          <Typography  variant="h6" noWrap component="div"
          fontFamily='fantasy'>
            明治安田生命J1リーグ
          </Typography>
          <div className='logo'><img src={Logo} alt='Logo' /></div>
        </Toolbar>
      </AppBar>
      
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        
        <Toolbar className='ToolbarSide' style={{display:'flex',justifyContent:'center',alignItems:'center',background:'#303030'}}>
          <div className='Logo2019' style={{display:'flex',alignItems:'center'}}>
            <img src={Logo2019} alt='Logo' style={{'width':'45px',height:'auto',alignItems:'center'}}/>
            </div>
            </Toolbar>
        <Divider />
        <List>
          {['順位', '試合結果'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={()=>handleListItemClick(index)}>
                <ListItemIcon>
                  {index % 2 === 0 ? <TableRowsIcon /> : <ScoreboardIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        <Outlet/>
      </Box>
    </Box>
  );
}