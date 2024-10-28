import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

const handleRegisterUser = asyncHandler(async (req, res) => {
  const { fullName, email, password, role } = req.body;

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

export { handleRegisterUser };
