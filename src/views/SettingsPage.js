import React from "react";
import SettingAppbar from "../components/SettingAppbar";
import {
  Container,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { FiDownload } from "react-icons/fi";

import "../components/SettingsPage.css";
import Backup from "../components/Backup";

const SettingsPage = () => {
  const matches800 = useMediaQuery("(min-width:800px)");
  const matches740 = useMediaQuery("(min-width:740px)");
  return (
    <div>
      <SettingAppbar titile={"Settings"} />
      <Container maxWidth={"md"}>
        <List>
          {matches740 ? (
            <ListItem className="list-item" button key={"backup"} disableRipple>
              {matches800 ? (
                <ListItemIcon>
                  <FiDownload size={25} />
                </ListItemIcon>
              ) : null}
              <ListItemText
                primary={"Download Backup"}
                secondary={
                  "We store your data safely on cloud. There is no such need to download your backup."
                }
              />

              <ListItemSecondaryAction>
                <Backup />
              </ListItemSecondaryAction>
            </ListItem>
          ) : (
            <div style={{ paddingTop: 20, paddingBottom: 20 }}>
              <Typography variant="h6">Download Backup</Typography>
              <Typography style={{ paddingTop: 5, paddingBottom: 5 }}>
                We store your data safely on cloud. There is no such need to
                download your backup.
              </Typography>
              <Backup />
            </div>
          )}
          <Divider style={{}} />
        </List>
      </Container>
    </div>
  );
};

export default SettingsPage;
