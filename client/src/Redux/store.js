import { combineReducers, configureStore } from "@reduxjs/toolkit";
import * as User from "./Reducers/userReducers";
import * as Categories from "./Reducers/CategoriesReducers";
import * as Movies from "./Reducers/MoviesReducers";
import * as Payment from "./Reducers/PaymentReducers";

const rootReducer = combineReducers({
  // user reducers
  userLogin: User.userLoginReducer,
  userRegister: User.userRegisterReducer,
  userUpdateProfile: User.userUpdateProfileReducer,
  userDeleteProfile: User.userDeleteProfileReducer,
  userChangePassword: User.userChangePasswordReducer,
  userGetFavoriteMovies: User.userGetFavoriteMoviesReducer,
  userDeleteFavoriteMovies: User.usersDeleteFavoriteMoviesReducer,
  adminGetAllUsers: User.adminGetAllUsersReducer,
  adminDeleteAllUsers: User.adminDeleteAllUsersReducer,
  userLikeMovie: User.userLikeMoviesReducer,

  // Category reducers
  categoryGetAll: Categories.getAllCategoriesReducer,
  categoryCreate: Categories.createCategoryReducer,
  categoryUpdate: Categories.updateCategoryReducer,
  categoryDelete: Categories.deleteCategoryReducer,
  // movies reduces
  getAllMovies: Movies.moviesListReducer,
  getMoviesRandom: Movies.moviesRandomReducer,
  getMoviesDetail: Movies.moviesDetailReducer,
  getMoviesTopRated: Movies.moviesTopRatedReducer,
  createReview: Movies.createReviewReducer,
  deleteMovie: Movies.deleteMovieReducer,
  deleteAllMovies: Movies.deleteALLMoviesReducer,
  createMovie: Movies.createMovieReducer,
  casts: Movies.CastsReducer,
  updateMovie: Movies.updateMovieReducer,
  //
  createPayment: Payment.createPaymentReducer,
});

// get userInfo from localStorage
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? localStorage.getItem("userInfo")
  : null;

// init  ialState
const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
});
