import React from "react";
import {
  Avatar,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { BiLogOut } from "react-icons/bi";
import app from "../api/firebase";
import { AiFillSetting } from "react-icons/all";
import { useHistory } from "react-router-dom";
import "../styles/index.css";
import "./CustomDrawer.css";
import { AiFillStar } from "react-icons/ai";
import { MdUpdate } from "react-icons/md";
const CustomDrawer = ({
  drawer,
  setDrawer,
  datesId,
  selectedDay,
  setActiveDate,
  setSelectedDay,
}) => {
  const history = useHistory();
  const { photoURL, displayName } = app.auth().currentUser;

  return (
    <Drawer
      className="parent"
      anchor={"left"}
      open={drawer}
      onClose={() => {
        setDrawer(false);
      }}
    >
      <div
        className="child"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <List style={{ minWidth: 250 }}>
          <ListItem
            button
            key={"backup"}
            onClick={() => history.push("/edit-profile")}
          >
            <ListItemIcon onClick={() => console.log(app.auth().currentUser)}>
              <Avatar alt={displayName} src={photoURL} />
            </ListItemIcon>
            <ListItemText primary={displayName} secondary={"update profile"} />
          </ListItem>
          <Divider />
          <ListItem
            button
            key={"backup"}
            onClick={() => history.push("/starred")}
          >
            <ListItemIcon>
              <AiFillStar size={25} />
            </ListItemIcon>
            <ListItemText primary={"Starred Events"} />
          </ListItem>
        </List>

        <List style={{ minWidth: 250 }}>
          <ListItem
            button
            key={"setting"}
            onClick={() => history.push("/settings")}
          >
            <ListItemIcon>
              <AiFillSetting size={25} />
            </ListItemIcon>
            <ListItemText primary={"Settings"} />
          </ListItem>
          <Divider />
          <ListItem
            button
            key={"contact"}
            onClick={() => {
              history.push("/changelog");
            }}
          >
            <ListItemIcon>
              <MdUpdate size={25} />
            </ListItemIcon>
            <ListItemText primary={"Changelog"} />
          </ListItem>
          <Divider />
          <ListItem button key={"logout"} onClick={() => app.auth().signOut()}>
            <ListItemIcon>
              <BiLogOut size={25} />
            </ListItemIcon>
            <ListItemText primary={"Logout"} />
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
};

export default CustomDrawer;
