import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "../Layout/Layout";
import { BiArrowBack } from "react-icons/bi";
import {
  FaCloudDownloadAlt,
  FaHeart,
  FaPlay,
  FaStepBackward,
  FaStepForward,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getMoviesDetailAction } from "../Redux/Actions/moviesActions";
import Loader from "../Components/Notifications/Loader";
import { RiMovie2Line } from "react-icons/ri";
import { MdHighQuality } from "react-icons/md";

function WatchPage() {
  let { id } = useParams();
  const [play, setPlay] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const dispatch = useDispatch();

  const {
    isLoading,
    isError,
    movies: movie,
  } = useSelector((state) => state.getMoviesDetail);
  const sameClass = "w-full gap-6 flex-col mx-auto min-h-screen";
  useEffect(() => {
    dispatch(getMoviesDetailAction(id));
  }, [dispatch, id]);

  const handleStepForward = () => {
    if (movie) {
      const video = document.getElementById("videoPlayer");
      if (video) {
        video.currentTime += 10;
      }
    }
  };

  const handleStepBackward = () => {
    if (movie) {
      const video = document.getElementById("videoPlayer");
      if (video) {
        video.currentTime -= 10;
      }
    }
  };

  return (
    <Layout>
      <div className="container mx-auto bg-dry p-6 mb-12">
        {!isError && (
          <div className="flex-btn flex-wrap mb-6 gap-2 bg-main rounded border border-gray-800 p-6">
            <Link
              to={`/movie/${movie?._id}`}
              className="md:text-xl text-sm flex gap-3 items-center font-bold text-dryGray"
            >
              <BiArrowBack /> {movie?.name}
            </Link>
            <div className="flex-btn sm:w-auto w-full gap-5">
              <button className="bg-white hover:text-subMain transitions bg-opacity-30 text-white rounded px-4 py-3 text-sm">
                <FaHeart />
              </button>
              <button className="bg-subMain flex-rows gap-2 hover:text-main transitions text-white rounded px-8 font-medium py-3 text-sm">
                <FaCloudDownloadAlt /> Download
              </button>
            </div>
          </div>
        )}

        {/* watch video */}
        {play ? (
          <video
            controls
            muted
            autoPlay={play}
            className="w-full h-full rounded"
            id="videoPlayer"
            onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
          >
            <source src={movie?.video} type="video/mp4" title={movie?.name} />
          </video>
        ) : (
          <div className="w-full h-screen rounded-lg overflow-hidden relative">
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
                <div className="absolute top-0 left-0 bottom-0 right-0 bg-main bg-opacity-30 flex-colo">
                  <button
                    onClick={() => setPlay(true)}
                    className="bg-white text-subMain flex-colo border border-subMain rounded-full w-20 h-20 font-medium text-xl"
                  >
                    <FaPlay />
                  </button>
                </div>
                <img
                  src={movie?.image ? `${movie.image}` : "images/user.png"}
                  alt={movie?.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </>
            )}
          </div>
        )}

        {play && (
          <div className="flex  justify-center gap-10 items-center pt-2">
            <button
              onClick={handleStepBackward}
              className="text-white bg-slate-800 hover:bg-slate-700 transitions text-1xl flex px-2 py-1 items-center gap-2 border-1 border-stone-300 rounded "
            >
              Rewind video 10s
              <FaStepBackward />
            </button>

            <button
              onClick={handleStepForward}
              className="text-white bg-slate-800 hover:bg-slate-700 transitions text-1xl flex px-2 py-1 items-center gap-2 border-1 border-stone-300 rounded"
            >
              <FaStepForward />
              Forward video 10s
            </button>
          </div>
        )}
        <div className="flex-btn sm:w-auto w-60 gap-5">
          <Link
            to="/develop"
            className="bg-subMain transitions text-white text-lg flex-rows gap-4 font-medium py-3 hover:text-main px-6 rounded-md"
          >
            <MdHighQuality /> HD Quality
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export default WatchPage;
