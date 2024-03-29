import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import commentRoutes from "./routes/commentRoute.js";
import postRoutes from "./routes/postRoute.js";
import replyRoutes from "./routes/replyRoute.js";
import userRoutes from "./routes/userRoute.js";

const app = express();
dotenv.config();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

const DB_URL_LOCAL = `mongodb://127.0.0.1:27017/${process.env.DB_NAME}`;

const DB_URL_REMOTE = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pu4qt.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

app.use("/users", userRoutes);
app.use("/post", postRoutes);
app.use("/comment", commentRoutes);
app.use("/reply", replyRoutes);

mongoose.connect(DB_URL_REMOTE, options, (err) => {
  if (!err) {
    console.log("Database Conected...");
  } else {
    console.log("Error in DB connection : " + err);
  }
});

app.get("/", (req, res) => {
  res.send("Hello Blog_Website_API Viewr!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
