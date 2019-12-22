import React from "react";
import Loader from "./Loader";

const RightSideBar = () => (
  <div className="flex flex-shrink-0 flex-col w-40 ml-5 pt-5">
    <button className="bg-blue-500 h-10 rounded font-bold text-white">
      Generate Schema
    </button>
    <Loader />
  </div>
);

export default RightSideBar;
