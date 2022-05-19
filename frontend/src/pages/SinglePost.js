/* eslint-disable no-undef */
import { Divider, Paper, Typography } from "@material-ui/core/";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getPost } from "../redux/features/postSlice";
import CommentSection from "./CommentSection";
import useStyles from "./styles";

const SinglePost = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { post } = useSelector((state) => ({
    ...state.post,
  }));

  console.log(post);

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getPost(id));
    }
  }, [dispatch, id]);

  return (
    // <div>
    //   <h1>Single Post</h1>
    //   <ul>
    //     {comments.map((comment) => (
    //       <li key={comment.id}>
    //         <p>{comment.content}</p>
    //         <p>{moment(comment.createdAt).format("MMMM Do YYYY, h:mm:ss a")}</p>
    //       </li>
    //     ))}
    //   </ul>
    // </div>
    <Paper
      style={{ margin: "100px", padding: "20px", borderRadius: "15px" }}
      elevation={6}
    >
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">
            {post.title}
          </Typography>
          <Typography gutterBottom variant="body1" component="p">
            {post.content}
          </Typography>
          <Typography variant="h6">
            Created by:
            <Link to="/" style={{ textDecoration: "none", color: "#3f51b5" }}>
              {post?.result?.name}
            </Link>
          </Typography>
          <Typography variant="body1">
            {/* {moment(post.createdAt).format("MMMM Do YYYY, h:mm:ss a")} */}
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <Typography variant="body1">
            <strong>Chat - coming soon!</strong>
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <CommentSection post={post} />
          <Divider style={{ margin: "20px 0" }} />
        </div>
      </div>
    </Paper>
  );
};

export default SinglePost;
