import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Header from "./Components/Header";
import AddPost from "./pages/AddPost";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
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
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/addPost" element={<AddPost />} />
          {/* <Route path="/editPost/:id" element={<AddPost />} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
