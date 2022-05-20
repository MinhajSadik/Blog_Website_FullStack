/* eslint-disable no-undef */
import { Divider, Paper, Typography } from "@material-ui/core/";
import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getPost } from "../redux/features/postSlice";
import CommentSection from "./CommentSection";

const SinglePost = () => {
  const dispatch = useDispatch();
  const { post } = useSelector((state) => ({
    ...state.post,
  }));
  console.log(post);
  const { user } = useSelector((state) => ({ ...state.auth }));

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getPost(id));
    }
  }, [dispatch, id]);

  return (
    <Paper
      style={{ margin: "100px", padding: "20px", borderRadius: "15px" }}
      elevation={6}
    >
      <div>
        <div>
          <Typography variant="h5" component="h5" className="text-start">
            {post.title}
          </Typography>
          <Typography
            gutterBottom
            variant="body1"
            component="p"
            className="text-start"
            style={{ marginTop: "10px" }}
          >
            {post.content}
          </Typography>
          <Typography
            variant="h6"
            className="text-start"
            style={{ marginTop: "10px" }}
          >
            Created by:
            <Link
              to="/profile"
              style={{ textDecoration: "none", color: "#3f51b5" }}
            >
              {user?.result?.name}
            </Link>
          </Typography>
          <Typography
            variant="body1"
            className="text-start"
            style={{ marginTop: "10px" }}
          >
            {moment(post.createdAt).format("DD/MM/YYYY, h:mm:ss a")}
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <Typography variant="body1">
            <strong>Chat Below - chat under this single post</strong>
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
