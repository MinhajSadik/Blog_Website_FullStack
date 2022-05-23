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
    if (!comment) return;
    e.preventDefault();
    const addCommentData = {
      comment,
      postId: post._id,
      author: user.result._id,
    };
    dispatch(addComment(addCommentData));
    setComment("");
  };

  return (
    <div>
      <div>
        <Input
          style={{
            width: "100%",
          }}
          value={comment}
          rows="2"
          rowsMax="2"
          placeholder="Write your comment..."
          onChange={typeComment}
        />
        <Button
          size="small"
          color="primary"
          variant="contained"
          style={{ backgroundColor: "#2196f3", marginTop: "10px" }}
          onClick={submitComment}
        >
          Comment
        </Button>
      </div>
    </div>
  );
};

export default CommentSection;
