import { Button, Input } from "@material-ui/core/";
import moment from "moment";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../redux/features/commentSlice";

const CommentSection = ({ post }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const { user } = useSelector((state) => ({
    ...state.auth,
  }));

  const typeComment = (e) => {
    setComment(e.target.value);
  };

  const commentSubmit = (e) => {
    e.preventDefault();
    const addCommentData = {
      comment,
      postId: post._id,
    };
    dispatch(addComment(addCommentData));
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
        <Input
          value={comment}
          rows="2"
          rowsMax="2"
          placeholder="Type your comment..."
          style={{ width: "100%" }}
          onChange={typeComment}
        />
        <div className="comment-actions">
          <Button
            size="small"
            color="primary"
            variant="contained"
            style={{ backgroundColor: "#2196f3" }}
            onClick={commentSubmit}
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
