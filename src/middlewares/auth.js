import Jwt from "jsonwebtoken";
import { catchError } from "./chatchError.js";
import ErrorHendler from "../utils/errorHendler.js";
import { User } from "../model/user.model.js";


export const isAuthenticate = catchError(async (req, res, next) => {
    let token;
  
    // Check if token exists in headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    
    // const { token } = req.cookies;

  if (!token) return next(new ErrorHendler("Plz Login or signUp", 404));

  const decoded = Jwt.verify(token, process.env.JWT_SECREATE);

  //this will set for find the req.user and check the request is valid or note and send the user details...
  req.user = await User.findById(decoded.id)
    .select("-password")
    .select("-salt");
  next();
});