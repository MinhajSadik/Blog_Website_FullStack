import {
  MDBCard,
  MDBCardBody,
  MDBCardGroup,
  MDBCardText,
  MDBCardTitle,
} from "mdb-react-ui-kit";
import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  const excerpt = (str) => {
    if (str.length > 45) {
      str = str.substring(0, 45) + "...";
    }
    return str;
  };

  console.log(post.author);

  return (
    <MDBCardGroup key={post._id}>
      <MDBCard className="h-100 mt-2 d-sm-flex" style={{ maxWidth: "30rem" }}>
        <MDBCardBody>
          <MDBCardTitle className="text-start">{post.title}</MDBCardTitle>
          <MDBCardText className="text-start">
            Date: {moment(post.date).format("DD/MM/YYYY")}
            <br />
            creator: {post.author.name}
          </MDBCardText>

          <MDBCardText className="text-start">
            {excerpt(post.content)}
            <Link
              style={{ margin: "5px", color: "blue" }}
              to={`/post/${post._id}`}
            >
              {" "}
              More
            </Link>
          </MDBCardText>
        </MDBCardBody>
      </MDBCard>
    </MDBCardGroup>
  );
};

export default PostCard;
