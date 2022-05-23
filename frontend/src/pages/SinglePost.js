/* eslint-disable no-undef */
import { Divider, Paper, Typography } from "@material-ui/core/";
import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Comment from "../Components/Comment";
import { getComment } from "../redux/features/commentSlice";
import { getPost } from "../redux/features/postSlice";
import CommentSection from "./CommentSection";

const SinglePost = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { post, comments } = useSelector((state) => ({
    ...state.post,
    ...state.comment,
  }));

  useEffect(() => {
    if (id) {
      dispatch(getPost(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (post._id) {
      dispatch(getComment(post._id));
    }
  }, [dispatch, post._id, comments]);

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
              {post?.author?.name}
            </Link>
          </Typography>
          <Typography
            variant="body1"
            className="text-start"
            style={{ marginTop: "10px" }}
          >
            {moment(post.createdAt).format("DD/MM/YYYY, h:mm:ss a")}
          </Typography>
          <Typography
            variant="body1"
            className="text-start"
            style={{ marginTop: "10px" }}
          >
            {comments.length > 0 && `post has ${comments.length} comments`}
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <Typography variant="body1">
            <strong>Chat Below - chat under this single post</strong>
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <CommentSection post={post} />
          <Divider style={{ margin: "20px 0" }} />
          <div>
            {comments?.map((comment) => (
              <Comment comment={comment} key={comment._id} />
            ))}
          </div>
        </div>
      </div>
    </Paper>
  );
};

export default SinglePost;
