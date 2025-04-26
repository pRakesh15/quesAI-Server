import { catchError } from "../middlewares/chatchError.js";
import { loginUser, registerUser } from "../services/auth.service.js";
import ErrorHendler from "../utils/errorHendler.js";
import { sendToken } from "../utils/sendToken.js";

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return next(new ErrorHendler("plz fill all the field", 400));
    }
    const user = await registerUser(name, email, password);
    // console.log(user)
    sendToken(res, user, "Register successfully", 201);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // Find user by email
    if (!email || !password) {
      return next(new ErrorHendler("plz fill all the field", 400));
    }
    const user = await loginUser(email, password);
    const username = user.name.split(" ")[0];
    sendToken(res, user, `WellCome back ${username}`, 201);
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMyprofile = catchError(async (req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});
