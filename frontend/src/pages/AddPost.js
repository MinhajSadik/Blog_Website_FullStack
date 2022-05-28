import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBValidation,
} from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { addPost } from "../redux/features/postSlice";

const initialState = {
  title: "",
  content: "",
  date: "",
};

const AddPost = () => {
  const [postData, setPostData] = useState(initialState);
  const [errMsg, setErrMsg] = useState(null);
  const { error } = useSelector((state) => ({
    ...state.post,
  }));
  const { user } = useSelector((state) => ({ ...state.auth }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { title, content, date } = postData;
  const { id } = useParams();

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && content && date) {
      const addPostData = { ...postData, author: user.result._id };
      dispatch(addPost({ postData: addPostData, navigate, toast }));
    } else {
      errMsg ? setErrMsg("Please fill all the fields") : setErrMsg("");
    }
  };
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setPostData({ ...postData, [name]: value });
  };

  const handleClear = () => {
    setPostData({ title: "", content: "", date: [] });
  };
  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "450px",
        alignContent: "center",
        marginTop: "120px",
      }}
      className="container"
    >
      <MDBCard alignment="center">
        <h5>{id ? "Update Post" : "Add Post"}</h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} className="row g-3" noValidate>
            <div className="col-md-12">
              <MDBInput
                placeholder="Enter Title"
                type="text"
                value={title}
                name="title"
                onChange={onInputChange}
                className="form-control"
                required
                invalid
                validation="Please provide your title"
              />
            </div>
            <div className="col-md-12">
              <MDBInput
                placeholder="Enter content"
                type="text"
                value={content}
                name="content"
                onChange={onInputChange}
                className="form-control"
                required
                invalid
                textarea
                rows={4}
                validation="Please provide your content"
              />
            </div>
            <div className="col-md-12">
              <MDBInput
                placeholder="Enter Date"
                type="date"
                value={date}
                name="date"
                onChange={onInputChange}
                className="form-control"
                required
                invalid
                validation="Please provide a Date"
              />
            </div>

            <div className="col-12">
              <MDBBtn style={{ width: "100%" }}>
                {id ? "Update" : "Submit"}
              </MDBBtn>
              <MDBBtn
                style={{ width: "100%" }}
                className="mt-2"
                color="danger"
                onClick={handleClear}
              >
                Clear
              </MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
};

export default AddPost;
