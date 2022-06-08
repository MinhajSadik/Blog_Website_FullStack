import { MDBCol, MDBRow } from "mdb-react-ui-kit";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Post from "../Components/Post/Post";
import { getPosts } from "../redux/features/postSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { posts, loading, isAuth } = useSelector((state) => ({
    ...state.post,
    ...state.auth,
  }));
  // const { id } = useParams();

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
        padding: "10px",
        marginLeft: "80px",
        maxWidth: "100%",
        alignContent: "center",
      }}
    >
      <MDBRow className="mt-5">
        <MDBCol>
          {isAuth ? (
            <MDBRow className="row-cols-1 row-cols-md-3 g-2">
              {posts?.map((post) => (
                <Post key={post._id} post={post} />
              ))}
            </MDBRow>
          ) : (
            <div>
              <h1>Please Login to see the posts, I saw you're not LoggedIn</h1>
            </div>
          )}
        </MDBCol>
      </MDBRow>
    </div>
  );
};

export default Home;
