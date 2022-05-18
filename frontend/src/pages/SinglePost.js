import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBContainer,
} from "mdb-react-ui-kit";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPost } from "../redux/features/postSlice";

const SinglePost = () => {
  const dispatch = useDispatch();
  const { post, loading } = useSelector((state) => ({
    ...state.post,
  }));
  const { id } = useParams();
  console.log(post);

  useEffect(() => {
    dispatch(getPost(id));
  }, [dispatch, id]);

  return (
    <>
      <MDBContainer className="top-left">
        <MDBCard className="mb-3 mt-2">
          <MDBCardBody>
            <MDBCardText className="text-start mt-2"></MDBCardText>
            <MDBCardText className="lead mb-0 text-start"></MDBCardText>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </>
  );
};

export default SinglePost;
