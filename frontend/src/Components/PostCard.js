import {
  MDBCard,
  MDBCardBody,
  MDBCardGroup,
  MDBCardText,
  MDBCardTitle,
} from "mdb-react-ui-kit";
import moment from "moment";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const PostCard = ({ title, content, date, _id, name }) => {
  const { user } = useSelector((state) => ({ ...state.auth }));
  const userId = user?.result?._id || user?.result?.id;

  const dispatch = useDispatch();
  const excerpt = (str) => {
    if (str.length > 45) {
      str = str.substring(0, 45) + " ...";
    }
    return str;
  };

  return (
    <MDBCardGroup>
      <MDBCard className="h-100 mt-2 d-sm-flex" style={{ maxWidth: "20rem" }}>
        <MDBCardText className="text-center">
          <MDBCardTitle>{title}</MDBCardTitle>
          <MDBCardText>{moment(date).format("DD/MM/YYYY")}</MDBCardText>
          <MDBCardText>{user.result.name}</MDBCardText>
        </MDBCardText>
        <div className="top-left">{name}</div>
        <MDBCardBody>
          <MDBCardTitle className="text-start">{title}</MDBCardTitle>
          <MDBCardText className="text-start">
            {excerpt(content)}
            <Link to={`/post/${_id}`}> Read More</Link>
          </MDBCardText>
        </MDBCardBody>
      </MDBCard>
    </MDBCardGroup>
  );
};

export default PostCard;
