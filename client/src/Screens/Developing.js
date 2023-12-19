import React from "react";
import { Link } from "react-router-dom";
import { BiHomeAlt } from "react-icons/bi";

function Developing() {
  return (
    <div className="flex-colo gap-8 w-full min-h-screen text-white bg-main lg:py-20 py-10 px-6">
      <img
        className="w-full h-96 object-contain"
        src="/images/developing.png"
        alt="Developing"
      />
      <h1 className="lg:text-4xl font-bold">Page Developing</h1>
      <p className="font-medium text-border italic leading-6">
        Sorry for the inconvenience. Please press the button below to return to
        the home page
      </p>
      <Link
        to="/"
        className="bg-subMain transitions text-white flex-rows gap-4 font-medium py-3 hover:text-main px-6 rounded-md"
      >
        <BiHomeAlt /> Back Home
      </Link>
    </div>
  );
}

export default Developing;
