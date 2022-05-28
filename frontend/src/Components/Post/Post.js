import { Card, CardMedia, Typography } from "@material-ui/core";
import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import useStyles from "./styles";

const Post = ({ post }) => {
  const excerpt = (str) => {
    if (str.length > 30) {
      str = str.substring(0, 30) + "...";
    }
    return str;
  };

  console.log(post.author);

  const classes = useStyles();

  return (
    <Card className={classes.card} style={{ maxWidth: "30rem" }}>
      <CardMedia
        className={classes.media}
        image={
          post.selectedFile ||
          "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
        }
        title={post.title}
      />
      <div className={classes.overlay}>
        <Typography variant="body1">
          {moment(post.createdAt).startOf().fromNow()}
        </Typography>
        <Typography className={classes.overlay1} variant="h6">
          {post.author.name}
        </Typography>
      </div>

      <Typography
        className={classes.title}
        gutterBottom
        variant="h5"
        component="h2"
      >
        {post.title}
      </Typography>
      <Typography
        variant="body2"
        color="textSecondary"
        component="p"
        className={classes.title}
      >
        {excerpt(post.content)}
        <Link style={{ color: "blue" }} to={`/post/${post._id}`}>
          {" "}
          More
        </Link>
      </Typography>
      <Typography
        className={classes.title}
        gutterBottom
        variant="caption"
        component="p"
      >
        Date: {moment(post.date || post.createdAt).format("DD/MM/YYYY")}
      </Typography>
    </Card>
  );
};

export default Post;
