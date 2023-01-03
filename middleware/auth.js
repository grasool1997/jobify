import CustomAPIError from "../errors/custom-api.js";
import jwt from "jsonwebtoken";
const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new CustomAPIError("Authentication Invalid", 401);
  }
  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.userId };
    next();
  } catch (error) {
    throw new CustomAPIError("Authentication Invalid", 401);
  }
};

export default auth;
