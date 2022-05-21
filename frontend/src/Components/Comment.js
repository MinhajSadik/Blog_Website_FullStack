import { Button, Input } from "@material-ui/core/";
import moment from "moment";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addReply } from "../redux/features/replySlice";
import Reply from "./Reply";

const Comment = ({ comment }) => {
  const dispatch = useDispatch();
  const [reply, setReply] = useState("");
  const { user } = useSelector((state) => ({
    ...state.auth,
  }));

  const typeReply = (e) => {
    setReply(e.target.value);
  };

  const replySubmit = (e) => {
    e.preventDefault();
    const replyData = {
      reply,
      commentId: comment._id,
      author: user.result._id,
    };
    dispatch(addReply(replyData));
  };

  const replyActionsStyle = {
    marginTop: "10px",
    marginBottom: "10px",
  };
  return (
    <div key={comment._id}>
      <div className="card p-3">
        <div className="d-flex justify-content-between align-items-center">
          <div className="user d-flex flex-row align-items-center">
            <span>
              <small className="font-weight-bold text-primary">
                {comment.author.name}
              </small>{" "}
              <small className="font-weight-bold">{comment.comment}</small>
            </span>
          </div>
          <small>{moment(comment.createdAt).startOf().fromNow()} </small>
        </div>
        <div className="action d-flex justify-content-between mt-2 align-items-center">
          <div className="reply px-4">
            <button>Reply</button>
          </div>
          <div className=" px-4">
            {comment.replies.length > 0 && (
              <button>{comment.replies.length} Replies</button>
            )}
          </div>
        </div>
      </div>
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
            onClick={replySubmit}
          >
            Reply
          </Button>
        </div>
      </div>
      {comment?.replies?.map((reply) => (
        <Reply key={reply._id} reply={reply} />
      ))}
    </div>
  );
};

export default Comment;
