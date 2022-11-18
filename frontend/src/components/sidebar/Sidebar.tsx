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


const drawerWidth = 240;

function Sidebar() {
  const drawer = (
    <div>
      <h1 id="title">Book Project</h1>
      <Toolbar />
      <List>
        <ListItem disablePadding>
          <ListItemButton LinkComponent={Link} href="/" >
            <ListItemIcon>
              <MenuBookIcon/>
            </ListItemIcon>
            <ListItemText primary="My Books" />
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
          <ListItemButton LinkComponent={Link} href="/Statistics" >
            <ListItemIcon>
              <MenuBookIcon/>
            </ListItemIcon>
            <ListItemText primary="Statistics" />
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
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}
export default Sidebar;