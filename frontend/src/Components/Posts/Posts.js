// import {
//   MDBCard,
//   MDBCardBody,
//   MDBCardGroup,
//   MDBCardText,
//   MDBCardTitle,
// } from "mdb-react-ui-kit";
import { Card, CardMedia, Typography } from "@material-ui/core";
import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import useStyles from "./styles";

const Post = ({ post }) => {
  const excerpt = (str) => {
    if (str.length > 45) {
      str = str.substring(0, 45) + "...";
    }
    return str;
  };

  console.log(post.author);

  const classes = useStyles();

  return (
    // <MDBCardGroup key={post._id}>
    //   <MDBCard className="h-100 mt-2 d-sm-flex" style={{ maxWidth: "30rem" }}>
    //     <MDBCardBody>
    //       <MDBCardTitle className="text-start">{post.title}</MDBCardTitle>
    //       <MDBCardText className="text-start">
    //         Date: {moment(post.date).format("DD/MM/YYYY")}
    //         <br />
    //         creator: {post.author.name}
    //       </MDBCardText>

    //       <MDBCardText className="text-start">
    //         {excerpt(post.content)}
    //         <Link
    //           style={{ margin: "5px", color: "blue" }}
    //           to={`/post/${post._id}`}
    //         >
    //           {" "}
    //           More
    //         </Link>
    //       </MDBCardText>
    //     </MDBCardBody>
    //   </MDBCard>
    // </MDBCardGroup>
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
