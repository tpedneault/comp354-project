import React from "react";
import {Outlet} from "react-router-dom";
import Sidebar from "../components/sidebar";
import {makeStyles} from "@material-ui/core/styles";
const useStyles = makeStyles({
  container:{
    display: "flex",
  }
});
const Layout = () => {
  const classes = useStyles();
    return (
      <>
      <Outlet />
      <div className={classes.container}>
        <Sidebar />
        </div>
      </>
    );
  };


export default Layout;