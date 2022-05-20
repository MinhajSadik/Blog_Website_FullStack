import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

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

//comments
export const addComment = (commentData) => API.post("/comment", commentData);
export const getComments = () => API.get("/comment");

//replies
export const addReply = (replyData) => API.post("/reply", replyData);
export const getReplies = () => API.get("/reply");
