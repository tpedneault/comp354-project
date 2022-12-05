import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import Link from "@material-ui/core/Link";
import CrisisAlertOutlinedIcon from "@mui/icons-material/CrisisAlertOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";

import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  drawer: {
    width: "240px",
  },
});

function Sidebar() {
  const classes = useStyles();
  const drawer = (
    <div>
      <h1 id="title">
        <img
          src="/logo.png"
          alt="logo"
          width={230}
          height={50}
          className="px-5 py-10"
        />
      </h1>
      <List>
        <ListItem>
          <ListItemButton LinkComponent={Link} href="/">
            <ListItemIcon>
              <AutoStoriesOutlinedIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="My Books" />
          </ListItemButton>
        </ListItem>
        <ListItem color="primary">
          <ListItemButton color="primary" LinkComponent={Link} href="/Goals">
            <ListItemIcon color="primary">
              <CrisisAlertOutlinedIcon color="primary" />
            </ListItemIcon>
            <ListItemText color="primary" primary="Goals" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton LinkComponent={Link} href="/Statistics">
            <ListItemIcon>
              <TrendingUpOutlinedIcon color="primary" />
            </ListItemIcon>
            <ListItemText id="title" primary="Statistics" />
          </ListItemButton>
        </ListItem>
      </List>
      <div>
        <List sx={{ position: "absolute", bottom: 0, width: "100%" }}>
          <ListItem>
            <ListItemButton LinkComponent={Link} href="/Settings">
              <ListItemIcon>
                <SettingsOutlinedIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton LinkComponent={Link} href="/Logout">
              <ListItemIcon>
                <LogoutOutlinedIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </div>
    </div>
  );
  const title = document.getElementById("title");
  if (title != null) {
    title.style.setProperty("text-align", "center");
  }

  return (
    <Drawer variant="permanent" className={classes.drawer}>
      {drawer}
    </Drawer>
  );
}
export default Sidebar;
