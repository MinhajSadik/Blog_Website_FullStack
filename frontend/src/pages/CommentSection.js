import { Button, TextField, Typography } from "@material-ui/core/";
import React from "react";
import { useSelector } from "react-redux";
import useStyles from "./styles";

const CommentSection = () => {
  const classes = useStyles();
  const { comments } = useSelector((state) => ({
    ...state.comment,
  }));
  const [comment, setComment] = React.useState("");
  //   const [comments, setComments] = React.useState([]);
  const commentsRef = React.useRef();
  const handleComment = (e) => {
    setComment("");
    commentsRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">
            Comments
          </Typography>
          {comments?.map((c, i) => (
            <Typography key={i} gutterBottom variant="subtitle1">
              <h1>Nothing</h1>
            </Typography>
          ))}
        </div>
        <div style={{ width: "70%" }}>
          <Typography gutterBottom variant="h6">
            Write a comment
          </Typography>
          <TextField
            fullWidth
            rows={2}
            variant="outlined"
            label="Comment"
            multiline
            value={comment}
            onChange={(e) => setComment(e.target.value)}
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
