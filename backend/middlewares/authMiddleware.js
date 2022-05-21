import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";

const checkAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findById(decoded.id);
    if (!user) {
      res.status(401).json({
        message: "Unauthorized",
      });
    } else {
      req.user = user;
      next();
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

export default checkAuth;
