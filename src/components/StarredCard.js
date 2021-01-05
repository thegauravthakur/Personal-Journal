import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import app from "../api/firebase";
import { AuthContext } from "../context/Provider";
import { formattedDate } from "../utils/helperFunctions";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 400,
    margin: "0 auto",
    marginBottom: 50,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function StarredCard({ title, date, body, index, docName, id }) {
  const history = useHistory();
  const classes = useStyles();
  const { currentUser } = useContext(AuthContext);
  const [image, setImage] = useState(null);
  useEffect(() => {
    app
      .storage()
      .ref(`/${currentUser.uid}/${docName}/${id}`)
      .getDownloadURL()
      .then((d) => setImage(d));
  });
  return (
    <Card className={classes.root}>
      <CardHeader
        titleTypographyProps={{
          style: {
            fontSize: 18,
            fontFamily: '"Segoe UI", serif',
            fontWeight: "bolder",
            color: "#52525B",
          },
        }}
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {index}
          </Avatar>
        }
        title={title}
        subheader={formattedDate(new Date(parseInt(date)))}
        // action={
        //   <IconButton
        //     onClick={() => {
        //       history.push("/");
        //     }}
        //   >
        //     <MdLaunch />
        //   </IconButton>
        // }
      />
      {image ? (
        <CardMedia
          className={classes.media}
          image={image}
          title="Paella dish"
        />
      ) : null}
      <CardContent>
        <Typography
          style={{
            fontSize: 16,
            fontFamily: '"Segoe UI", serif',
            color: "#71717A",
          }}
          variant="body2"
          color="textSecondary"
          component="p"
        >
          {body}
        </Typography>
      </CardContent>
      {/*<CardActions disableSpacing>*/}
      {/*  <IconButton aria-label="add to favorites">*/}
      {/*    /!*<FavoriteIcon />*!/*/}
      {/*  </IconButton>*/}
      {/*  <IconButton aria-label="share">/!*<ShareIcon />*!/</IconButton>*/}
      {/*</CardActions>*/}
    </Card>
  );
}
