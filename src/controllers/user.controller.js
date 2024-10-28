import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import jwt from "jsonwebtoken";

const generateAccessTokenAndRefreshToken = async (user) => {
  const accessToken = await user.generateAccessToken();
  const refreshToken = await user.generateRefreshToken();

  await User.findOneAndUpdate(user._id, {
    refreshToken: refreshToken,
  }).catch((error) => {
    throw new ApiError(500, error.message);
  });

  return { accessToken, refreshToken };
};

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

  const { accessToken, refreshToken } =
    await generateAccessTokenAndRefreshToken(user);

  return res
    .status(201)
    .cookie("auth", accessToken)
    .cookie("token", refreshToken)
    .json(
      new ApiResponse(
        201,
        {
          id: user._id,
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

  if (!verifyPassword) {
    throw new ApiError(401, "Password incorrect");
  }

  const { accessToken, refreshToken } =
    await generateAccessTokenAndRefreshToken(user);

  return res
    .status(200)
    .cookie("auth", accessToken)
    .cookie("token", refreshToken)
    .json(
      new ApiResponse(
        200,
        {
          user: {
            id: user._id,
            fullName: user.fullName,
            email: user.email,
            role: user.role,
          },
        },
        "User logged in successfully",
      ),
    );
});

const handleUserDetails = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  // const userId = req.params.id;
  const user = await User.findById(userId).select("-password -refreshToken");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
      "Request completed",
    ),
  );
});

const handleRefreshAccessToken = asyncHandler(async (req, res) => {
  const token = req.cookies?.token;

  if (!token) {
    throw new ApiError(401, "Unauthorized request");
  }

  try {
    const decoded = await jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

    const user = await User.findById(decoded?.id);

    if (user.refreshToken === token) {
      const { accessToken, refreshToken } =
        await generateAccessTokenAndRefreshToken(user);

      return res
        .status(200)
        .cookie("auth", accessToken)
        .cookie("token", refreshToken)
        .json(new ApiResponse(200, null, "Refreshed accessed token"));
    } else {
      new ApiError(400, "Invalid token");
    }
  } catch (e) {
    throw new ApiError(400, e.message);
  }
});

export {
  handleRegisterUser,
  handleLoginUser,
  handleUserDetails,
  handleRefreshAccessToken,
};
