import { MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../redux/features/postSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state) => ({
    ...state.post,
  }));

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // const location = useLocation();

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
            <MDBRow>
              {posts.map((post) => (
                <div key={post.id}>
                  <h1>{post.title}</h1>
                  <p>{post.content}</p>
                </div>
              ))}
            </MDBRow>
          </MDBContainer>
        </MDBCol>
      </MDBRow>
    </div>
  );
};

export default Home;
