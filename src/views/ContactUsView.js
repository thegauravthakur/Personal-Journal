import React from "react";
import SettingAppbar from "../components/SettingAppbar";
import { Button, Grid } from "@material-ui/core";
import { IoLogoTwitter, IoLogoLinkedin } from "react-icons/io";
import { HiOutlineMail } from "react-icons/hi";

const ContactUsView = () => {
  return (
    <div>
      <SettingAppbar positon={"absolute"} title={"Contact Us"} />
      <Grid
        style={{ minHeight: "100vh", maxWidth: 300, margin: "0 auto" }}
        container
        direction={"column"}
        alignItems={"center"}
        justify={"center"}
        spacing={5}
      >
        <Grid item style={{ minWidth: "100%" }}>
          <Button
            // onClick={() => window.open("mailto:gthakur581@gmail.com", "_blank")}
            onClick={() => {
              navigator.serviceWorker.getRegistration().then(function (reg) {
                reg.showNotification("Hello world!", {
                  body: "hello wrold",
                  badge: "/favicon-96x96.png",
                });
              });
            }}
            startIcon={<HiOutlineMail />}
            fullWidth
            variant="outlined"
          >
            Contact on E-mail
          </Button>
        </Grid>
        <Grid item style={{ minWidth: "100%" }}>
          <Button
            // onClick={() =>
            //   window.open("https://twitter.com/gauravcodes", "_blank")
            // }
            onClick={() => {
              navigator.serviceWorker.getRegistration().then(function (reg) {
                reg.showNotification("Hello world!", {
                  body: "hello wrold",
                  badge: "/favicon-16x16.png",
                });
              });
            }}
            startIcon={<IoLogoTwitter />}
            fullWidth
            variant="outlined"
          >
            Contact on twitter
          </Button>
        </Grid>

        <Grid item style={{ minWidth: "100%" }}>
          <Button
            // onClick={() =>
            //   window.open("https://linkedin.com/in/gauravcodes/", "_blank")
            // }
            onClick={() => {
              navigator.serviceWorker.getRegistration().then(function (reg) {
                reg.showNotification("Hello world!", {
                  body: "hello wrold",
                  badge: "/favicon-32x32.png",
                });
              });
            }}
            startIcon={<IoLogoLinkedin />}
            fullWidth
            variant="outlined"
          >
            Contact on LinkedIn
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default ContactUsView;
