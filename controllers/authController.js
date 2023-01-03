import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import CustomAPIError from "../errors/custom-api.js";
import bcrypt from "bcryptjs";

const register = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    throw new CustomAPIError(
      "Please provide all values",
      StatusCodes.BAD_REQUEST
    );
  }
  const userAlreadyExists = await User.findOne({ email: req.body.email });
  if (userAlreadyExists) {
    throw new CustomAPIError("User already exists", StatusCodes.CONFLICT);
  }
  const user = await User.create(req.body);
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({
    user: {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      location: user.location,
    },
    token,
    location: user.location,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new CustomAPIError(
      "Please provide all values!",
      StatusCodes.BAD_REQUEST
    );
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new CustomAPIError("Invalid Credentials", StatusCodes.UNAUTHORIZED);
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new CustomAPIError("Invalid Credentials", StatusCodes.UNAUTHORIZED);
  }
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({
    user: {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      location: user.location,
    },
    token,
    location: user.location,
  });
};

const updateUser = async (req, res) => {
  const { name, email, lastName, location } = req.body;
  console.log(req.body);
  if (!name || !email || !lastName || !location) {
    throw new CustomAPIError(
      "Please provide all values",
      StatusCodes.BAD_REQUEST
    );
  }
  const user = await User.findOne({ _id: req.user.userId });

  user.email = email;
  user.name = name;
  user.lastName = lastName;
  user.location = location;

  await user.save();

  const token = user.createJWT();

  res.status(StatusCodes.OK).json({ user, token, location: user.location });
};

export { register, login, updateUser };
