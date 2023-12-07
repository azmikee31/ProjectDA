import React, { useEffect } from "react";
import Table from "../../../Components/Table";
import SideBar from "../SideBar";
import { useDispatch, useSelector } from "react-redux";
import { getAllMoviesAction } from "../../../Redux/Actions/moviesActions";
import toast from "react-hot-toast";
import Loader from "../../../Components/Notifications/Loader";
import { Empty } from "../../../Components/Notifications/Empty";
import { TbPlayerTrackNext, TbPlayerTrackPrev } from "react-icons/tb";

function MoviesList() {

  const dispatch = useDispatch();

  const sameClass = `text-white p-2 rounded font-semibold border-2 border-subMain`

  const { isLoading, isError, movies, page, pages, likedMovies } = useSelector(
    (state) => state.getAllMovies
  );
  useEffect(() => {
    //errors
    if (isError) {
      toast.error(isError)
    }
    dispatch(getAllMoviesAction({}))
  }, [dispatch, isError]);

  // pagination next ad pev pages
  const nextPage = () => {
    dispatch(getAllMoviesAction({
      pageNumber: page + 1
    }))
  }
  const prevPage = () => {
    dispatch(getAllMoviesAction({
      pageNumber: page - 1
    }))
  }


  return (
    <SideBar>
      <div className="flex flex-col gap-6">
        <div className="flex-btn gap-2">
          <h2 className="text-xl font-bold">Movies List</h2>
          <button className="bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded">
            Delete All
          </button>
        </div>
        {isLoading ? (
          <Loader />
        ) : movies?.length > 0 ? (
          <>
            <Table data={movies} admin={true} />
            {/* Loading More */}
            <div className="w-full flex-rows gap-6  my-5">
              <button onClick={prevPage} disabled={page === 1} className={`${sameClass} ${page === 1 ? "opacity-50 hover:bg-transparent" : "hover:bg-subMain"}`}>
                <TbPlayerTrackPrev className="text-xl" />
              </button>
              <button onClick={nextPage} disabled={page === pages} className={`${sameClass} ${page === pages ? "opacity-50 hover:bg-transparent" : "hover:bg-subMain"}`}>
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
