import jwt from "jsonwebtoken";
import UserModel from "../models/userModel";
const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;
    let decodedData;
    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decodedData.id;
    } else {
      decodedData = jwt.decode(token);
      const user = await UserModel.findOne({ _id: decodedData._id });
      req.userId = user._id;
    }
    next();
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: error.message,
    });
  }
};

export default auth;
