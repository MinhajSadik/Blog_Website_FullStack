import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Home from "./pages/Home";

import SinglePost from "./Components/Comment/SinglePost";
import PrivateRoute from "./Components/Routes/PrivateRoute";
import Header from "./Components/Shared/Header";
import Login from "./Components/Users/Login";
import Register from "./Components/Users/Register";
import AddPost from "./pages/AddPost";
import { setUser } from "./redux/features/authSlice";

function App() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  useEffect(() => {
    dispatch(setUser(user));
  }, [dispatch, user]);

  return (
    <BrowserRouter>
      <Header />
      <div className="App">
        <ToastContainer />
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route path="/post/search/:searchValue" element={<Home />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/addPost"
            element={
              <PrivateRoute>
                <AddPost />
              </PrivateRoute>
            }
          />
          {/* <Route path="/editPost/:id" element={<AddPost />} /> */}
          <Route
            path="/post/:id"
            element={
              <PrivateRoute>
                <SinglePost />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
