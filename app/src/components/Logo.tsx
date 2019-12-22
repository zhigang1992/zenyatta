import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link className="text-xl font-semibold text-gray-800" to="/">
      <span className="font-bold text-2xl">{"{ } "}</span> Zenyatta
    </Link>
  );
};
export default Logo;
