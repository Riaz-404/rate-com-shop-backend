import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

const handleRegisterUser = asyncHandler(async (req, res) => {
  const { fullName, email, password, role } = req.body;

  if (!fullName || !email || !password) {
    throw new ApiError(400, "Some fields are missing");
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ApiError(400, "Email already existed");
  }

  const user = await User.create({ fullName, email, password, role });

  return res.status(201).json(
    new ApiResponse(
      201,
      {
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
      "User created successfully",
    ),
  );
});

const handleLoginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Some fields are missing");
  }

  const user = await User.findOne({ email: email });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const verifyPassword = await user.isPasswordCorrect(password);

  if (!verifyPassword) throw new ApiError(400, "Password incorrect");

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        user: {
          fullName: user.fullName,
          email: user.email,
          role: user.role,
        },
      },
      "User logged in successfully",
    ),
  );
});

export { handleRegisterUser, handleLoginUser };
