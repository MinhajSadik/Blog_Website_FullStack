/* eslint-disable no-undef */
import { Button, Divider, Input, Paper, Typography } from "@material-ui/core/";
import moment from "moment";
import React, { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getComments } from "../redux/features/commentSlice";
import { getPost } from "../redux/features/postSlice";
import { addReply, getReplies } from "../redux/features/replySlice";
import CommentSection from "./CommentSection";

const SinglePost = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [reply, setReply] = useState("");
  const { post, comments, replies } = useSelector((state) => ({
    ...state.post,
    ...state.comment,
    ...state.reply,
  }));
  const { user } = useSelector((state) => ({ ...state.auth }));

  console.log("replies", replies);

  const typeReply = (e) => {
    setReply(e.target.value);
  };

  const submitReply = (e) => {
    e.preventDefault();
    const replyData = {
      reply,
      postId: post._id,
      author: user?.result?._id,
    };
    dispatch(addReply(replyData));
  };

  useEffect(() => {
    if (id) {
      dispatch(getPost(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getComments());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getReplies());
  }, [dispatch]);

  const replyActionsStyle = {
    display: "flex",
  };

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
          {id === post._id && (
            <div>
              {comments?.map((comment) => (
                <div key={comment._id}>
                  <Typography variant="body1">
                    <strong>{comment.user?.name}</strong>
                  </Typography>
                  <Typography variant="body1">{comment.comment}</Typography>
                  <Accordion defaultActiveKey="1">
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>Reply</Accordion.Header>
                      <Accordion.Body>
                        <div className="reply-input">
                          <Input
                            value={reply}
                            rows="2"
                            id={comment._id}
                            rowsMax="2"
                            placeholder={"Type your reply..."}
                            style={{ width: "100%" }}
                            onChange={typeReply}
                          />
                          <div className="comment-action">
                            <Button
                              size="small"
                              color="primary"
                              variant="contained"
                              style={replyActionsStyle}
                              onClick={submitReply}
                            >
                              Reply
                            </Button>
                          </div>
                        </div>
                      </Accordion.Body>
                      <Accordion.Body>
                        {replies?.map((reply) => (
                          <div key={reply._id}>
                            <Typography variant="body1">
                              <strong>{reply.author?.name}</strong>
                            </Typography>
                            <Typography variant="body1">
                              {reply.reply}
                            </Typography>
                            <Typography
                              variant="body1"
                              style={{ marginTop: "10px" }}
                            >
                              {moment(comment.createdAt).format(
                                "DD/MM/YYYY, h:mm:ss a"
                              )}
                            </Typography>
                          </div>
                        ))}
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
              ))}
            </div>
          )}
          <div>
            <Typography variant="body1">
              <strong>Add a comment</strong>
            </Typography>
          </div>
        </div>
      </div>
    </Paper>
  );
};

export default SinglePost;
