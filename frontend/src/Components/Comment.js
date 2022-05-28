import { Button, Input } from "@material-ui/core/";
import moment from "moment";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addReply } from "../redux/features/replySlice";
import Reply from "./Reply";

const Comment = ({ comment }) => {
  const dispatch = useDispatch();
  const [reply, setReply] = useState("");
  const [clickReply, setClickReply] = useState(false);

  const { user } = useSelector((state) => ({
    ...state.auth,
  }));

  const typeReply = (e) => {
    setReply(e.target.value);
  };

  const submitReply = (e) => {
    e.preventDefault();
    if (!reply) return;
    const addReplyData = {
      reply,
      commentId: comment._id,
      author: user.result._id,
    };
    dispatch(addReply(addReplyData));
    setReply("");
  };

  const replyActionsStyle = {
    marginTop: "10px",
    marginBottom: "10px",
  };
  return (
    <div key={comment._id}>
      <div
        style={{ background: "#3a3b3c", color: "white" }}
        className="card p-3"
      >
        <div className="d-flex justify-content-between align-items-center">
          <div className="user d-flex flex-row align-items-center">
            <span>
              <span className="font-weight-bold text-primary d-flex">
                {comment.author.name}
              </span>
              <p className="font-weight-bold">{comment.comment}</p>
            </span>
          </div>
          <small>{moment(comment.createdAt).startOf().fromNow()}</small>
        </div>
        <div className="action d-flex justify-content-between mt-2 align-items-center">
          <div className="reply px-4 ">
            <button onClick={() => setClickReply(!clickReply)}>
              {!clickReply ? "Reply" : "Hide"}
            </button>
          </div>
          <div className="font-weight-bold text-primary">
            {comment.replies.length > 0 && (
              <button>{comment.replies.length} Replies</button>
            )}
          </div>
        </div>
      </div>
      {clickReply && (
        <div className="reply-input">
          <Input
            style={{
              width: "95%",
              marginLeft: "5%",
            }}
            value={reply}
            rows="2"
            id={comment._id}
            rowsMax="2"
            placeholder={"Write a reply..."}
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
          {comment?.replies?.map((reply) => (
            <Reply key={reply._id} reply={reply} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
