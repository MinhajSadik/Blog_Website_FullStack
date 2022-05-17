import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBContainer,
  MDBIcon,
} from "mdb-react-ui-kit";
import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getPost } from "../redux/features/postSlice";

const SinglePost = () => {
  const dispatch = useDispatch();
  const { post, relatedPost } = useSelector((state) => ({ ...state.post }));
  const { user } = useSelector((state) => ({ ...state.auth }));
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getPost({ id }));
  }, [dispatch, id]);
  return (
    <>
      <MDBContainer className="top-left">
        <MDBCard className="mb-3 mt-2">
          <MDBCardBody>
            <MDBBtn
              tag="a"
              color="none"
              style={{ float: "left", color: "#000" }}
              onClick={() => navigate("/")}
            >
              <MDBIcon
                fas
                size="lg"
                icon="long-arrow-alt-left"
                style={{ float: "left" }}
              />
            </MDBBtn>
            <h3>{post.title}</h3>
            <span>
              <p className="text-start postName">
                Created By: {user?.result?.name}
              </p>
            </span>
            <br />
            <MDBCardText className="text-start mt-2">
              <MDBIcon
                style={{ float: "left", margin: "5px" }}
                far
                icon="calendar-alt"
                size="lg"
              />
              <small className="text-muted">
                {moment(post.createdAt).format("MMMM Do YYYY")}
              </small>
            </MDBCardText>
            <MDBCardText className="lead mb-0 text-start">
              {post.content}
            </MDBCardText>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </>
  );
};

export default SinglePost;
