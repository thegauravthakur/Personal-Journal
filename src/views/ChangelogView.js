import React from "react";
import SettingAppbar from "../components/SettingAppbar";
import {
  Container,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
} from "@material-ui/core";

// function displayNotification() {
//   if (Notification.permission === "granted") {
//     navigator.serviceWorker.getRegistration().then(function (reg) {
//       reg.showNotification("20 sec delat", {
//         timestamp: Math.floor(Date.now() + 20000),
//       });
//     });
//   }
// }
const ChangelogView = () => {
  return (
    <div>
      <SettingAppbar title={"Changelog"} />
      <Container maxWidth={"lg"}>
        <List
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Last updated at 9th Jan, 2020
            </ListSubheader>
          }
          style={{}}
        >
          <ListItem button key={"setting"}>
            <ListItemText
              primary={"Now the application can work without internet."}
            />
          </ListItem>
          <Divider />
          <ListItem button key={"contact"}>
            <ListItemText primary={"Updated the caching rules"} />
          </ListItem>
        </List>
      </Container>
    </div>
  );
};

export default ChangelogView;
