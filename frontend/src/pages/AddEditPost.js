import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBValidation,
} from "mdb-react-ui-kit";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { createPost } from "../redux/api";

const initialState = {
  title: "",
  content: "",
  date: "",
};

const AddEditPost = () => {
  const [postData, setPostData] = useState(initialState);
  const [tag, setTags] = React.useState([]);
  const [tagErrMsg, setTagErrMsg] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state.auth }));

  const { title, content, date } = postData;
  const { id } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!date.length) {
      setTagErrMsg("Please provide some tags");
    }
    if (title && content && date) {
      const updatedTourData = { ...postData, name: user?.result?.name };

      if (!id) {
        dispatch(createPost({ updatedTourData, navigate, toast }));
      } else {
        // dispatch(updateTour({ id, updatedTourData, toast, navigate }));
      }
      handleClear();
    }
  };
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setPostData({ ...postData, [name]: value });
  };
  const handleClear = () => {
    setPostData({ title: "", content: "", date: "" });
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
                value={title || ""}
                name="title"
                onChange={onInputChange}
                className="form-control"
                required
                invalid
                validation="Please provide title"
              />
            </div>
            <div className="col-md-12">
              <MDBInput
                placeholder="Enter Your Content"
                type="text"
                value={content}
                name="content"
                onChange={onInputChange}
                className="form-control"
                required
                invalid
                textarea
                rows={4}
                validation="Please provide Content"
              />
            </div>
            <div className="col-md-12">
              <MDBInput
                placeholder="Enter Date"
                type="date"
                value={date || ""}
                name="date"
                onChange={onInputChange}
                className="form-control"
                required
                invalid
                validation="Please provide Date "
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

export default AddEditPost;
