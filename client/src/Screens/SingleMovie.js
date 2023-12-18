import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieCasts from "../Components/Single/MovieCasts";
import MovieInfo from "../Components/Single/MovieInfo";
import MovieRates from "../Components/Single/MovieRates";
import Titles from "../Components/Titles";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../Layout/Layout";
import { BsCollectionFill } from "react-icons/bs";
import Movie from "../Components/Movie";
import ShareMovieModal from "../Components/Modals/ShareModal";
import { getMoviesDetailAction } from "../Redux/Actions/moviesActions";
import Loader from "../Components/Notifications/Loader";
import { RiMovie2Line } from "react-icons/ri";

function SingleMovie() {
  const [modalOpen, setModalOpen] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const sameClass = "w-full gap-3 flex-col flex items-center min-h-screen";
  const {
    isLoading,
    isError,
    movies: movie,
  } = useSelector((state) => state.getMoviesDetail);
  const { movies } = useSelector((state) => state.getAllMovies);
  const RelatedMovies = movies
    ? movies?.filter((m) => m.category === movie?.category)
    : null;

  useEffect(() => {
    dispatch(getMoviesDetailAction(id));
  }, [dispatch, id]);
  return (
    <Layout>
      {isLoading ? (
        <div className={sameClass}>
          <Loader />
        </div>
      ) : isError ? (
        <div className={sameClass}>
          <div className="flex-colo w-24 h-24 p-5 rounded-full bg-dry text-subMain text-4xl">
            <RiMovie2Line />
          </div>
          <p className="text-border text-sm">{isError}</p>
        </div>
      ) : (
        <>
          <ShareMovieModal
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            movie={movie}
          />
          <MovieInfo movie={movie} setModalOpen={setModalOpen} />
          <div className="container mx-auto min-h-screen px-2 my-6">
            <MovieCasts movie={movie} />
            <MovieRates movie={movie} />
            {RelatedMovies
              ? RelatedMovies.length > 0 && (
                <div className="my-16">
                  <Titles title="Related Movies" Icon={BsCollectionFill} />
                  <div className="grid sm:mt-10 mt-6 xl:grid-cols-4 2xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 gap-6">
                    {RelatedMovies.map((movie) => (
                      <Movie key={movie?._id} movie={movie} />
                    ))}
                  </div>
                </div>
              )
              : ""}
          </div>
        </>
      )}
    </Layout>
  );
}

export default SingleMovie;
