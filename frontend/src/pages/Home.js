import { MDBCol, MDBContainer, MDBRow, MDBTypography } from "mdb-react-ui-kit";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import PostCard from "../Components/PostCard";
import { getPosts } from "../redux/features/postSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { posts, loading, currentPage } = useSelector((state) => ({
    ...state.post,
  }));

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const location = useLocation();
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "1000px",
        alignContent: "center",
      }}
    >
      <MDBRow className="mt-5">
        {posts.length === 0 && location.pathname === "/" && (
          <MDBTypography className="text-center mb-0" tag="h2">
            No Post Found
          </MDBTypography>
        )}
        <MDBCol>
          <MDBContainer>
            <MDBRow className="row-cols-1 row-cols-md-3 g-2">
              {posts.map((post) =>
                post.map((p) => <PostCard key={p._id} {...p} />)
              )}
            </MDBRow>
          </MDBContainer>
        </MDBCol>
      </MDBRow>
    </div>
  );
};

export default Home;
