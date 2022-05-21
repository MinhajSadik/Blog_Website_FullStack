import { Button, Input } from "@material-ui/core/";
import moment from "moment";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addReply } from "../redux/features/replySlice";
import Reply from "./Reply";

const Comment = ({ comment }) => {
  const dispatch = useDispatch();
  const [reply, setReply] = useState("");

  const typeReply = (e) => {
    setReply(e.target.value);
  };

  console.log(comment);

  const replySubmit = (e) => {
    e.preventDefault();
    const replyData = {
      reply,
      commentId: comment._id,
      author: comment.author,
    };
    dispatch(addReply(replyData));
  };

  const replyActionsStyle = {
    marginTop: "10px",
    marginBottom: "10px",
  };
  return (
    <div key={comment._id}>
      {/* <Paper
        style={{
          margin: "100px",
          padding: "20px",
          borderRadius: "15px",
        }}
        elevation={6}
      >
        <h4>Comment</h4>

        <Typography variant="body1">
          <strong>{comment?.author?.name}</strong>
        </Typography>
        <Typography variant="body1">{comment.comment}</Typography>
        <Typography variant="body1" style={{ marginTop: "10px" }}>
          {moment(comment.createdAt).format("DD/MM/YYYY, h:mm:ss a")}
        </Typography>
      </Paper> */}
      <div className="bg-gray-300 rounded-md text-gray-600 p-2 pt-1 my-2">
        <div className="bg-purple-500 rounded-full inline-block px-2 py-1 text-white ">
          Comment
        </div>
        <p className="bg-gray-200 rounded px-2 py-1">{comment.comment}</p>
        <small>{moment(comment.createdAt).startOf().fromNow()}</small>
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
