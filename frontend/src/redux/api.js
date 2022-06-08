import axios from "axios";

const devEnv = process.env.NODE_ENV !== "production";

const { REACT_APP_DEV_API, REACT_APP_PROD_API } = process.env;

const API = axios.create({
  baseURL: `${devEnv ? REACT_APP_DEV_API : REACT_APP_PROD_API}`,
});

// const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

//authentication
export const signIn = (formData) => API.post("/users/signin", formData);
export const signUp = (formData) => API.post("/users/signup", formData);

//posts
export const addPost = (postData) => API.post("/post", postData);
export const getPosts = () => API.get("/post");
export const getPost = (id) => API.get(`/post/${id}`);
export const getPostBySearch = (searchQuery) =>
  API.get(`/post/search?searchQuery=${searchQuery}`);

//comments
export const addComment = (commentData) => API.post("/comment", commentData);
export const getComment = (id) => API.get(`/comment/${id}`);

//replies
export const addReply = (replyData) => API.post("/reply", replyData);
export const getReply = (id) => API.get(`/reply/${id}`);
