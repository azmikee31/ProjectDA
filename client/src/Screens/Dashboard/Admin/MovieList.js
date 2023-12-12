import React, { useEffect } from "react";
import Table from "../../../Components/Table";
import SideBar from "../SideBar";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteMovieAction,
  getAllMoviesAction,
} from "../../../Redux/Actions/moviesActions";
import toast from "react-hot-toast";
import Loader from "../../../Components/Notifications/Loader";
import { Empty } from "../../../Components/Notifications/Empty";
import { TbPlayerTrackNext, TbPlayerTrackPrev } from "react-icons/tb";

function MoviesList() {
  const dispatch = useDispatch();

  const sameClass = `text-white p-2 rounded font-semibold border-2 border-subMain`;
  // all movies
  const { isLoading, isError, movies, page, pages } = useSelector(
    (state) => state.getAllMovies
  );
  // delete movie
  const { isLoading: deleteLoading, isError: deleteError } = useSelector(
    (state) => state.deleteMovie
  );

  // delete movie
  // delete handler
  const deleteMovieHandler = (id) => {
    window.confirm("Are you sure you want do delete this movies?") &&
      dispatch(deleteMovieAction(id));
  };

  // useEffect
  useEffect(() => {
    //errors
    if (isError || deleteError) {
      toast.error(isError || deleteError);
    }
    dispatch(getAllMoviesAction({}));
  }, [dispatch, isError, deleteError]);

  // pagination next ad pev pages
  const nextPage = () => {
    dispatch(
      getAllMoviesAction({
        pageNumber: page + 1,
      })
    );
  };
  const prevPage = () => {
    dispatch(
      getAllMoviesAction({
        pageNumber: page - 1,
      })
    );
  };

  return (
    <SideBar>
      <div className="flex flex-col gap-6">
        <div className="flex-btn gap-2">
          <h2 className="text-xl font-bold">Movies List</h2>
        </div>
        {isLoading || deleteLoading ? (
          <Loader />
        ) : movies?.length > 0 ? (
          <>
            <Table
              data={movies}
              admin={true}
              onDeleteHandler={deleteMovieHandler}
            />
            {/* Loading More */}
            <div className="w-full flex-rows gap-6  my-5">
              <button
                onClick={prevPage}
                disabled={page === 1}
                className={`${sameClass} ${
                  page === 1
                    ? "opacity-50 hover:bg-transparent"
                    : "hover:bg-subMain"
                }`}
              >
                <TbPlayerTrackPrev className="text-xl" />
              </button>
              <button
                onClick={nextPage}
                disabled={page === pages}
                className={`${sameClass} ${
                  page === pages
                    ? "opacity-50 hover:bg-transparent"
                    : "hover:bg-subMain"
                }`}
              >
                <TbPlayerTrackNext className="text-xl" />
              </button>
            </div>
          </>
        ) : (
          <Empty message="You have no movies" />
        )}
      </div>
    </SideBar>
  );
}

export default MoviesList;
