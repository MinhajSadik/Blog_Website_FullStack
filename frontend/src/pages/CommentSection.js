import { Button, Input } from "@material-ui/core/";
import moment from "moment";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const initialState = {
  comment: {},
  comments: [],
  reply: {},
  replies: [],
  error: "",
};

const CommentSection = ({ post }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = React.useState("");
  const [reply, setReply] = React.useState("");
  const [editClicked, setEditClicked] = React.useState(true);
  const [replyClicked, setReplyClicked] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(true);
  const { user } = useSelector((state) => ({
    ...state.auth,
  }));
  const { comments } = useSelector((state) => ({
    ...state.comment,
  }));
  console.log(post.comments);

  const editComment = (comment) => {
    // setComment(comment);
    // setEditClicked(true);
  };

  const saveEdit = (comment) => {
    // dispatch(
    //   addComment({
    //     comment,
    //     postId: post.id,
    //   })
    // );
    setEditClicked(false);
  };

  const replyToComment = (comment) => {
    // setReplyClicked(true);
  };
  const cancelEdit = () => {
    // setEditClicked(false);
  };
  const typeComment = (e) => {
    setComment(e.target.value);
  };
  const typeReply = (e) => {
    setReply(e.target.value);
  };

  const replyCancel = () => {
    // setReplyClicked(false);
    // setComment("");
  };
  const replySumbit = (comment) => {
    // dispatch(
    //   addReply({
    //     comment,
    //     postId: post.id,
    //   })
    // );
    setReplyClicked(false);
  };

  const date = Date.now();

  const replyActionsStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  return (
    <div className="single-comment" style={{ marginLeft: "" }}>
      <div className="comment-header">
        <div style={{ float: "left" }}>{user?.result?.name}:</div>
        <div style={{ float: "right" }}>
          {moment(post?.comments?.createdAt).format("DD/MM/YYYY, h:mm:ss a")}
        </div>
      </div>
      {/* comment part */}
      <div className="comment-content">
        {editClicked ? (
          <Input
            value={comment}
            rows="2"
            rowsMax="2"
            placeholder="Type your reply..."
            style={{ width: "100%" }}
            onChange={typeComment}
          />
        ) : (
          <div className="comment-text">{post.comments.comment}</div>
        )}
        <div className="comment-actions">
          {post?.author?._id === user?.result?._id ? (
            <Button
              size="small"
              color="primary"
              variant="contained"
              style={{ backgroundColor: "#2196f3" }}
              onClick={() => editComment(comment)}
            >
              Send
            </Button>
          ) : (
            ""
          )}
          <Button
            size="small"
            color="primary"
            variant="contained"
            style={{ backgroundColor: "#2196f3" }}
            onClick={editClicked ? cancelEdit : replyToComment}
          >
            {editClicked ? "Cancel" : "Comment"}
          </Button>
        </div>
      </div>

      {/* reply part */}
      {replyClicked ? (
        <div className="reply-input">
          <Input
            value={reply}
            rows="2"
            rowsMax="2"
            placeholder={"Type your comment..."}
            style={{ width: "100%" }}
            onChange={typeReply}
          />
          <div className="comment-action">
            <Button
              size="small"
              color="primary"
              variant="contained"
              style={replyActionsStyle}
              onClick={() => replySumbit(comment)}
            >
              Submit
            </Button>
            <Button
              size="small"
              color="primary"
              variant="contained"
              style={replyActionsStyle}
              onClick={replyCancel}
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default CommentSection;
