import asyncHandler from "express-async-handler";
import User from "../Models/UserModels.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../middlewares/Auth.js";
const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, password, image } = req.body;
  try {
    const userExists = await User.findOne({ email });
    //kiểm tra nếu ng dùng tồn tại

    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create user in DB
    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      image,
    });

    // if user created successfully send user data and token to client
    if (user) {
      res.status(201).json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        image: user.image,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc login user
// @route POST api/user/login
// access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    // find user in DB
    const user = await User.findOne({ email });
    // if user exists compare password with hashed password then send user data and token to client
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        image: user.image,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid email or password");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ****** PRIVATE CONTROLLERS ******
// @desc Update user profile
// @route PUT /api/users/profile
// access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const { fullName, email, image } = req.body;
  try {
    // find use in DB
    const user = await User.findById(req.user._id);
    // if user exists update user data  and save it in DB
    if (user) {
      user.fullName = fullName || user.fullName;
      user.email = email || user.email;
      user.image = image || user.image;

      const updateUser = await user.save();
      // send update user data and token to client
      res.json({
        _id: updateUser._id,
        fullName: updateUser.fullName,
        email: updateUser.email,
        image: updateUser.image,
        isAdmin: updateUser.isAdmin,
        token: generateToken(updateUser._id),
      });
    }
    // else send error message
    else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc Delete user profile
// @route DELETE api/users
// @access Private
const deleteUserProfile = asyncHandler(async (req, res) => {
  const userId = req.params.id
  try {
    // find user in DB
    const user = await User.findById(userId)
    // if user exists delete user from DB
    if (user) {
      // if user is admin throw error message
      if (user.isAdmin) {
        res.status(400);
        throw new Error("Can't delete admin user");
      }
      user.remove
      // else delete user from DB
      res.json({ message: "User delete successfully", data: user });

    }
    // else send error message
    else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// desc Change user password
// @route PUT /api/users/password
// @access Private
const changeUserPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  try {
    // find user in DB
    const user = await User.findById(req.user._id);
    // if use exists compare old password with hashed password then update user password and save it in DB
    if (user && (await bcrypt.compare(oldPassword, user.password))) {
      // hash new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      user.password = hashedPassword;
      await user.save();
      res.json({ message: "Password changed!!" });
    }
    //else send error message
    else {
      res.status(401);
      throw new Error("Invalid password");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const getLikedMovies = asyncHandler(async (req, res) => {
  try {
    // find user in DB
    const user = await User.findById(req.user._id).populate("likedMovies");
    //if
    if (user) {
      res.json(user.likedMovies);
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    res.json({ message: error.message });
  }
});

// @desc Add movie to liked movies
// @route POST /api/users/favorites
// @access Private
const addLikedMovies = asyncHandler(async (req, res) => {
  const { movieId } = req.body;
  try {
    const user = await User.findById(req.user._id);
    //
    if (user) {
      // check if movie already liked
      // if movie already liked send error message
      if (user.likedMovies.includes(movieId)) {
        res.status(400);
        throw new Error("Movie already liked");
      }
      // else
      user.likedMovies.push(movieId);
      await user.save();
      res.json({ message: "Movie added to liked movies" });
    }
    // else send error message
    else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc Delete all liked movies
// @route DELETE /api/users/favorites
// @access Private
const deleteLikedMovies = asyncHandler(async (req, res) => {
  try {
    //
    const user = await User.findById(req.user._id);
    if (user) {
      user.likedMovies = [];
      await user.save;
      res.json({ message: "All liked movies deleted successfully" });
    }
    // else send error message
    res.status(404);
    throw new Error("User not found");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ******** ADMIN CONTROLLERS ********
// @desc Get all user
// @route GET /api/users/
// @access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  try {
    //find
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc Delete user
// @route DELETE /api/users/:id
// @access Private/Admin\
const deleteUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);

    if (user) {
      if (user.isAdmin) {
        res.status(400);
        throw new Error("Can't delete admin user");
      } else {
        const deleteUser = await User.deleteOne({ _id: userId });
        res.json({ message: "User deleted successfully" });
        return deleteUser;
      }
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export {
  registerUser,
  loginUser,
  updateUserProfile,
  deleteUserProfile,
  changeUserPassword,
  getLikedMovies,
  addLikedMovies,
  deleteLikedMovies,
  deleteUser,
  getUsers,
};
