import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/user-model";

export const signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const existedUser = await UserModel.findOne({ email });
    if (existedUser) {
      return res.status(400).send({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { email: result.email, id: result._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).send(error.message);
    console.error(error.message);
  }
};
