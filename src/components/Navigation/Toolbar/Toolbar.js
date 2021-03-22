import React from "react";
import classes from "./Toolbar.css";
import Logo from "../../Logo/Logo";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";
import NavigationItems from "../NavigationItems/NavigationItems";

const Toolbar = (props) => {
  return (
    <header className={classes.Toolbar}>
      <DrawerToggle openSideDrawer={props.openSideDrawer} />
      <div className={classes.Logo}>
        <Logo />
      </div>
      <nav className={classes.DesktopOnly}>
        <NavigationItems />
      </nav>
    </header>
  );
};

export default Toolbar;
