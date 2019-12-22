import React from "react";

const Loader = (props: { size?: number }) => {
  const size = props.size || 20;
  return (
    <img
      alt="Loading..."
      src={require("../assets/loading-spin.svg")}
      width={size}
      height={size}
    />
  );
};

export default Loader;
