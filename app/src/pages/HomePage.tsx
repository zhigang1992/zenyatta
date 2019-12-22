import uuid from "uuid/v4";
import React from "react";
import { Redirect } from "react-router-dom";

const HomePage = () => {
  return <Redirect to={`${uuid()}/typescript`} />;
};

export default HomePage;
