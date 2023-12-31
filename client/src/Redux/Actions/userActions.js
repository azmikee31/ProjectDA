import * as userConstants from "../Constants/userConstants";
import * as userApi from "../APIs/userServices";
// import toast from "react-hot-toast";
import { ErrorsAction, tokenProtection } from "../Protection";
import toast from "react-hot-toast";
import * as actionTypes from "../Constants/userConstants";

// login actions
const loginAction = (datas) => async (dispatch) => {
  try {
    dispatch({ type: userConstants.USER_LOGIN_REQUEST });
    const response = await userApi.loginService(datas);
    console.log(response);
    dispatch({ type: userConstants.USER_LOGIN_SUCCESS, payload: response });
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.USER_LOGIN_FAIL);
  }
};

// register  actions
const registerAction = (datas) => async (dispatch) => {
  try {
    dispatch({ type: userConstants.USER_REGISTER_REQUEST });
    await userApi.registerService(datas);
    dispatch({ type: userConstants.USER_REGISTER_SUCCESS, payload: {} });
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.USER_REGISTER_FAIL);
  }
};

// logout actions
const logoutAction = () => (dispatch) => {
  userApi.logoutService();
  dispatch({ type: userConstants.USER_LOGOUT });
  dispatch({ type: userConstants.USER_LOGIN_RESET });
  dispatch({ type: userConstants.USER_REGISTER_RESET });
};

// update profile action
const updateProfileAction = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.USER_UPDATE_PROFILE_REQUEST });
    const response = await userApi.updateProfileService(
      user,
      tokenProtection(getState)
    );
    dispatch({
      type: userConstants.USER_UPDATE_PROFILE_SUCCESS,
      payload: response,
    });
    toast.success("Profile Updated");
    dispatch({
      type: userConstants.USER_LOGIN_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.USER_UPDATE_PROFILE_FAIL);
  }
};

// delete profile action
const deleteProfileAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.USER_DELETE_PROFILE_REQUEST });
    await userApi.deleteProfileService(tokenProtection(getState));
    dispatch({ type: userConstants.USER_DELETE_PROFILE_SUCCESS });
    toast.success("Profile Delete");
    dispatch(logoutAction());
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.USER_DELETE_PROFILE_FAIL);
  }
};

//change password action
const changePasswordAction = (passwords) => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.USER_CHANGE_PASSWORD_REQUEST });
    const response = await userApi.changePasswordService(
      passwords,
      tokenProtection(getState)
    );
    dispatch({
      type: userConstants.USER_CHANGE_PASSWORD_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.USER_CHANGE_PASSWORD_FAIL);
  }
};

//get all favorite movies action
const getFavoriteMoviesAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.GET_FAVORITE_MOVIES_REQUEST });
    const response = await userApi.getFavoriteMoviesService(
      tokenProtection(getState)
    );
    dispatch({
      type: userConstants.GET_FAVORITE_MOVIES_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.GET_FAVORITE_MOVIES_FAIL);
  }
};
const toggleFavoriteToast = (isFavorite) => ({
  type: actionTypes.TOGGLE_FAVORITE_TOAST,
  payload: isFavorite,
});

//delete all favorite movies action
const deleteFavoriteMoviesAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.DELETE_FAVORITE_MOVIES_REQUEST });
    await userApi.deleteFavoriteMoviesService(tokenProtection(getState));
    dispatch({
      type: userConstants.DELETE_FAVORITE_MOVIES_SUCCESS,
    });
    toast.success("Favorite Movies Delete");
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.DELETE_FAVORITE_MOVIES_FAIL);
  }
};

// admin get all users action
const getAllUsersAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.GET_ALL_USERS_REQUEST });
    const response = await userApi.getAllUsersService(
      tokenProtection(getState)
    );
    dispatch({
      type: userConstants.GET_ALL_USERS_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.GET_ALL_USERS_FAIL);
  }
};

// admin delete users
const deleteUsesAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.DELETE_USERS_REQUEST });
    await userApi.deleteUserService(id, tokenProtection(getState));
    dispatch({
      type: userConstants.DELETE_USERS_SUCCESS,
    });
    toast.success("User Deleted");
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.DELETE_USERS_FAIL);
  }
};

//user like movies Action
// const LikeMoviesAction = (MovieId) => async (dispatch, getState) => {
//   try {
//     dispatch({ type: userConstants.LIKE_MOVIES_REQUEST });
//     const response = await userApi.likeMoviesService(
//       MovieId,
//       tokenProtection(getState)
//     );
//     dispatch({
//       type: userConstants.LIKE_MOVIES_SUCCESS,
//       payload: response,
//     });
//     toast.success("Added to your favorites");
//     dispatch(getFavoriteMoviesAction());
//   } catch (error) {
//     ErrorsAction(error, dispatch, userConstants.LIKE_MOVIES_FAIL);
//   }
// };
const LikeMoviesAction = (MovieId) => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.LIKE_MOVIES_REQUEST });
    const response = await userApi.likeMoviesService(
      MovieId,
      tokenProtection(getState)
    );
    dispatch({
      type: userConstants.LIKE_MOVIES_SUCCESS,
      payload: response,
    });

    // Toggle hiển thị toast dựa trên thành công hay không
    dispatch(toggleFavoriteToast(response.success));

    dispatch(getFavoriteMoviesAction());
    toast.success(response.message);
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.LIKE_MOVIES_FAIL);
  }
};

export {
  loginAction,
  registerAction,
  logoutAction,
  updateProfileAction,
  deleteProfileAction,
  changePasswordAction,
  getFavoriteMoviesAction,
  deleteFavoriteMoviesAction,
  getAllUsersAction,
  deleteUsesAction,
  LikeMoviesAction,
  toggleFavoriteToast,
};
