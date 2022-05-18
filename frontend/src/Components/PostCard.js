import {
  MDBCard,
  MDBCardBody,
  MDBCardGroup,
  MDBCardText,
  MDBCardTitle,
} from "mdb-react-ui-kit";
import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const PostCard = ({ title, content, date, _id, name }) => {
  const { user } = useSelector((state) => ({ ...state.auth }));
  const userId = user?.result?._id || user?.result?.id;

  // const dispatch = useDispatch();
  // const excerpt = (str) => {
  //   if (str.length > 45) {
  //     str = str.substring(0, 45) + " ...";
  //   }
  //   return str;
  // };

  return (
    <MDBCardGroup>
      <MDBCard className="h-100 mt-2 d-sm-flex" style={{ maxWidth: "20rem" }}>
        <MDBCardBody>
          <MDBCardTitle className="text-start">{title} </MDBCardTitle>
          <MDBCardText>
            {moment(date).format("DD/MM/YYYY")}
            <br />
            created by: {user.result.name}
          </MDBCardText>

          <MDBCardText className="text-start">
            {content}
            <Link to={`/post/${_id}`}> Read More</Link>
          </MDBCardText>
        </MDBCardBody>
      </MDBCard>
    </MDBCardGroup>
  );
};

export default PostCard;
