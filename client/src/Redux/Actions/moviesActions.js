import * as moviesConstants from "../Constants/MoviesConstants";
import * as moviesApi from "../APIs/MoviesServices";
import { ErrorsAction, tokenProtection } from "../Protection";
import toast from "react-hot-toast";
// get all movies action
export const getAllMoviesAction =
  ({
    category = "",
    time = "",
    language = "",
    rate = "",
    year = "",
    search = "",
    pageNumber = "",
  }) =>
  async (dispatch) => {
    try {
      const response = await moviesApi.getAllMoviesService({
        category,
        time,
        language,
        rate,
        year,
        search,
        pageNumber,
      });
      dispatch({
        type: moviesConstants.MOVIES_LIST_SUCCESS,
        payload: response,
      });
    } catch (error) {
      ErrorsAction(error, dispatch, moviesConstants.MOVIES_LIST_FAIL);
    }
  };

export const getMoviesRandomAction = () => async (dispatch) => {
  try {
    dispatch({ type: moviesConstants.MOVIES_RANDOM_REQUEST });
    const response = await moviesApi.getRandomMoviesService();
    dispatch({
      type: moviesConstants.MOVIES_RANDOM_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, moviesConstants.MOVIES_RANDOM_FAIL);
  }
};

export const getMoviesDetailAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: moviesConstants.MOVIES_DETAIL_REQUEST });
    const response = await moviesApi.getMovieByIdService(id);
    dispatch({
      type: moviesConstants.MOVIES_DETAIL_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, moviesConstants.MOVIES_DETAIL_FAIL);
  }
};

export const getMoviesTopRatedAction = () => async (dispatch) => {
  try {
    dispatch({ type: moviesConstants.MOVIES_TOP_RATED_REQUEST });
    const response = await moviesApi.getTopRatedMoviesService();
    dispatch({
      type: moviesConstants.MOVIES_TOP_RATED_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, moviesConstants.MOVIES_TOP_RATED_FAIL);
  }
};
export const reviewMovieAction =
  ({ id, review }) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: moviesConstants.CREATE_REVIEW_REQUEST });
      const response = await moviesApi.reviewMovieService(
        tokenProtection(getState),
        id,
        review
      );
      dispatch({
        type: moviesConstants.CREATE_REVIEW_SUCCESS,
        payload: response,
      });
      toast.success("Review added successfully");
      dispatch({ type: moviesConstants.CREATE_REVIEW_RESET });
      dispatch(getMoviesDetailAction(id));
    } catch (error) {
      ErrorsAction(error, dispatch, moviesConstants.CREATE_REVIEW_FAIL);
    }
  };

// delete movie action
export const deleteMovieAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: moviesConstants.DELETE_MOVIE_REQUEST });
    const response = await moviesApi.deleteMovieService(
      tokenProtection(getState),
      id
    );
    dispatch({
      type: moviesConstants.DELETE_MOVIE_SUCCESS,
      payload: response,
    });
    toast.success("Movie deleted successfulfy");
    dispatch(getAllMoviesAction({}));
  } catch (error) {
    ErrorsAction(error, dispatch, moviesConstants.DELETE_MOVIE_FAIL);
  }
};

// delete all movies action
export const deleteAllMoviesAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: moviesConstants.DELETE_ALL_MOVIES_REQUEST });
    const response = await moviesApi.deleteMovieService(
      tokenProtection(getState)
    );
    dispatch({
      type: moviesConstants.DELETE_ALL_MOVIES_SUCCESS,
      payload: response,
    });
    toast.success("All Movies deleted successfulfy");
    dispatch(getAllMoviesAction({}));
  } catch (error) {
    ErrorsAction(error, dispatch, moviesConstants.DELETE_ALL_MOVIES_FAIL);
  }
};

// create movie
export const createMovieAction = (movie) => async (dispatch, getState) => {
  try {
    dispatch({ type: moviesConstants.CREATE_MOVIE_REQUEST });
    const response = await moviesApi.createMovieService(
      tokenProtection(getState),
      movie
    );
    dispatch({
      type: moviesConstants.CREATE_MOVIE_SUCCESS,
      payload: response,
    });
    toast.success("Movie created successfully");
    dispatch(deleteAllCastAction());
  } catch (error) {
    ErrorsAction(error, dispatch, moviesConstants.CREATE_MOVIE_FAIL);
  }
};

// ******** CAST **********

// add cast
export const addCastAction = (cast) => async (dispatch, getState) => {
  dispatch({ type: moviesConstants.ADD_CAST, payload: cast });
  localStorage.setItem("casts", JSON.stringify(getState().casts.casts));
};

//  remove cast
export const removeCastAction = (id) => async (dispatch, getState) => {
  dispatch({ type: moviesConstants.DELETE_CAST, payload: id });
  localStorage.setItem("casts", JSON.stringify(getState().casts.casts));
};

// edit cast
export const editCastAction = (cast) => async (dispatch, getState) => {
  dispatch({ type: moviesConstants.EDIT_CAST, payload: cast });
  localStorage.setItem("casts", JSON.stringify(getState().casts.casts));
};

// edit cast
export const deleteAllCastAction = () => async (dispatch) => {
  dispatch({ type: moviesConstants.RESET_CAST });
  localStorage.removeItem("casts");
};

// Update Category action
export const updateMovieAction = (id, movie) => async (dispatch, getState) => {
  try {
    dispatch({ type: moviesConstants.UPDATE_MOVIE_REQUEST });
    const response = await moviesApi.updateMovieService(
      tokenProtection(getState),
      id,
      movie
    );
    dispatch({ type: moviesConstants.UPDATE_MOVIE_SUCCESS, payload: response });
    toast.success("Movie updated successfully");
    dispatch(getMoviesDetailAction(id));
    dispatch(deleteAllCastAction());
  } catch (error) {
    ErrorsAction(error, dispatch, moviesConstants.UPDATE_MOVIE_FAIL);
  }
};
