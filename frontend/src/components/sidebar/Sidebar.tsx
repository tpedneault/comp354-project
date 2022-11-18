import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import Link from '@material-ui/core/Link';

import {makeStyles} from "@material-ui/core/styles";
const useStyles = makeStyles({
  drawer:{
    width: '240px',

  }
});


function Sidebar() {
  const classes = useStyles();
  const drawer = (
    <div>
      <h1 id="title">Book Project</h1>
      <List>
        <ListItem disablePadding>
          <ListItemButton LinkComponent={Link} href="/" >
            <ListItemIcon>
              <MenuBookIcon/>
            </ListItemIcon>
            <ListItemText id="title" primary="My Books" />
          </ListItemButton>
        /</ListItem>
        <ListItem disablePadding>
          <ListItemButton LinkComponent={Link} href="/Goals" >
            <ListItemIcon>
              <MenuBookIcon/>
            </ListItemIcon>
            <ListItemText primary="Goals" />
          </ListItemButton>
        /</ListItem>
        <ListItem disablePadding>
          <ListItemButton  LinkComponent={Link} href="/Statistics" >
            <ListItemIcon>
              <MenuBookIcon/>
            </ListItemIcon>
            <ListItemText id="title" primary="Statistics" />
          </ListItemButton>
        /</ListItem>
      </List>
      <div>
      <List sx={{position: 'absolute',bottom:0,width: '100%'}}>
        <ListItem disablePadding>
          <ListItemButton LinkComponent={Link} href="/Settings" >
            <ListItemIcon>
              <MenuBookIcon/>
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
        /</ListItem>
        <ListItem disablePadding>
          <ListItemButton LinkComponent={Link} href="/Logout" >
            <ListItemIcon>
              <MenuBookIcon/>
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        /</ListItem>
      </List>
      </div>
      
    </div>
  );
  const title=document.getElementById('title');
  if (title !=null){
    title.style.setProperty('text-align','center')
  }

  return (
      <Drawer
          variant="permanent" className={classes.drawer}>
          {drawer}
        </Drawer>
  );
}
export default Sidebar;