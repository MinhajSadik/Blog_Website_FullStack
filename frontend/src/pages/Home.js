import { MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostCard from "../Components/PostCard";
import { getPosts } from "../redux/features/postSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state) => ({
    ...state.post,
  }));
  console.log(posts);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

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
        <MDBCol>
          <MDBContainer>
            <MDBRow className="row-cols-1 row-cols-md-3 g-2">
              {posts.map((post, index) => (
                <PostCard key={post._id} post={post} />
              ))}
            </MDBRow>
          </MDBContainer>
        </MDBCol>
      </MDBRow>
    </div>
  );
};

export default Home;
