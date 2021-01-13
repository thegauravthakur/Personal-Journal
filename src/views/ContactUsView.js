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
            onClick={() => window.open("mailto:gthakur581@gmail.com", "_blank")}
            startIcon={<HiOutlineMail />}
            fullWidth
            variant="outlined"
          >
            Contact on E-mail
          </Button>
        </Grid>
        <Grid item style={{ minWidth: "100%" }}>
          <Button
            onClick={() =>
              window.open("https://twitter.com/gauravcodes", "_blank")
            }
            startIcon={<IoLogoTwitter />}
            fullWidth
            variant="outlined"
          >
            Contact on twitter
          </Button>
        </Grid>

        <Grid item style={{ minWidth: "100%" }}>
          <Button
            onClick={() =>
              window.open("https://linkedin.com/in/gauravcodes/", "_blank")
            }
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
