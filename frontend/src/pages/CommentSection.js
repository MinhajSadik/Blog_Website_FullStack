import { Button, TextField, Typography } from "@material-ui/core/";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComment } from "../redux/features/commentSlice";
import useStyles from "./styles";

const CommentSection = ({ post }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state.auth }));
  const [comment, setComment] = React.useState("");

  const classes = useStyles();
  const { comments } = useSelector((state) => ({
    ...state.comment,
  }));
  console.log(comments);
  const handleComment = (e) => {
    e.preventDefault();
    const commentData = { ...comment, user: user?.result?.name };
    dispatch(createComment(commentData));
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setComment({ ...comment, [name]: value });
  };

  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div style={{ width: "50%" }}>
          <Typography gutterBottom variant="h6">
            Write a comment
          </Typography>
          <TextField
            fullWidth
            minRows={1}
            variant="outlined"
            label="Declare a Comment"
            value={comment}
            onChange={onInputChange}
          />
          <br />
          <Button
            style={{ marginTop: "10px" }}
            fullWidth
            disabled={!comment.length}
            color="primary"
            variant="contained"
            onClick={handleComment}
          >
            Comment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
