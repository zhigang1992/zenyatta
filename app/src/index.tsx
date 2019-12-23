import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

if (process.env.NODE_ENV === "production") {
  require("./tailwind.production.css");
} else {
  require("./tailwind.development.css");
}

if (process.env.NODE_ENV === "production") {
  const Sentry = require("@sentry/browser");
  Sentry.init({
    dsn: "https://b772cd630f0e4db2aadb9adb894d1a18@sentry.io/1864868"
  });
}

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
