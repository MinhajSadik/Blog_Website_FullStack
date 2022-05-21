import { Button, Input } from "@material-ui/core/";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../redux/features/commentSlice";

const CommentSection = ({ post }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const { user } = useSelector((state) => ({ ...state.auth }));

  const typeComment = (e) => {
    setComment(e.target.value);
  };

  const submitComment = (e) => {
    e.preventDefault();
    const addCommentData = {
      comment,
      postId: post._id,
      author: user.result._id,
    };
     dispatch(addComment(addCommentData));
  };

  return (
    <div style={{ marginLeft: "" }}>
      <div>
        <Input
          value={comment}
          rows="2"
          rowsMax="2"
          placeholder="Type your comment..."
          style={{ width: "100%" }}
          onChange={typeComment}
        />
        <Button
          size="small"
          color="primary"
          variant="contained"
          style={{ backgroundColor: "#2196f3", marginTop: "10px" }}
          onClick={submitComment}
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default CommentSection;
