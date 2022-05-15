import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBIcon,
  MDBInput,
  MDBSpinner,
  MDBValidation,
} from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "../redux/features/authSlice";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const [formValue, setFormValue] = useState(initialState);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { email, password } = formValue;
  const { loading, error } = useSelector((state) => ({ ...state.auth }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      dispatch(login({ formValue, navigate, toast }));
    }
  };
  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "450px",
        alignContent: "center",
        marginTop: "120px",
      }}
    >
      <MDBCard alignment="center">
        <h5>Sign In</h5>
        <MDBIcon fas icon="user-circle" className="fa-2x" />
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">
            <div className="col-md-12">
              <MDBInput
                label="Your email"
                type="email"
                value={email}
                name="email"
                onChange={onInputChange}
                required
                invalid="true"
                validation="please provide your email"
              />
            </div>
            <div className="col-md-12">
              <MDBInput
                label="Your password"
                type="password"
                value={password}
                name="password"
                onChange={onInputChange}
                required
                invalid="true"
                validation="please provide your password"
              />
            </div>
            <div className="col-12">
              <MDBBtn style={{ width: "100%" }} className="mt-2">
                {loading && (
                  <MDBSpinner
                    size="sm"
                    role="status"
                    tag="span"
                    className="me-2"
                  />
                )}
                Login
              </MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
        <MDBCardFooter>
          <Link to="/register">
            <p>Don't have an account ? Sign Up</p>
          </Link>
        </MDBCardFooter>
      </MDBCard>
    </div>
  );
};

export default Login;
