import uuid from "uuid/v4";
import React from "react";
import { Redirect, Link } from "react-router-dom";
import { StoreContext } from "../mobx/store";
import NavigationBar from "../components/NavigationBar";
import Logo from "../components/Logo";

const HomePage = () => {
  // return <Redirect to={`${uuid()}/typescript`} />;
  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <div className="container mx-auto">
        <div className="flex py-5 items-center border-b-2 border-gray-200 h-24 px-6 justify-between">
          <Logo />
          <a
            className="block flex items-center text-gray-600 mr-5"
            href="https://github.com/zhigang1992/zenyatta"
          >
            <svg
              className="fill-current w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>GitHub</title>
              <path d="M10 0a10 10 0 0 0-3.16 19.49c.5.1.68-.22.68-.48l-.01-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.1.39-1.99 1.03-2.69a3.6 3.6 0 0 1 .1-2.64s.84-.27 2.75 1.02a9.58 9.58 0 0 1 5 0c1.91-1.3 2.75-1.02 2.75-1.02.55 1.37.2 2.4.1 2.64.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85l-.01 2.75c0 .26.18.58.69.48A10 10 0 0 0 10 0"></path>
            </svg>
          </a>
        </div>
        <div className="w-full px-6 pt-16 pb-40 flex">
          <div className="flex-1 mr-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-4xl font-light leading-tight">
              A strongly-typed, hosted service for{" "}
              <span className="sm:block text-teal-500 font-normal">
                building json configurations endpoint.
              </span>
            </h1>
            <p className="mt-6 leading-relaxed text-lg text-gray-600">
              Zenyatta is a service that will allow you to create OTA update
              JSON service in seconds, also allows your teammates to edit the
              same JSON at any time.
            </p>
            <div className="flex mt-6 justify-start">
              <Link
                to={`/${uuid()}/typescript`}
                className="rounded-lg px-4 md:px-5 xl:px-4 py-3 md:py-4 xl:py-3 bg-teal-500 hover:bg-teal-600 md:text-lg xl:text-base text-white font-semibold leading-tight shadow-md"
              >
                Get Started with TypeScript
              </Link>
              <Link
                to={`/${uuid()}/jsonSchema`}
                className="ml-4 rounded-lg px-4 md:px-5 xl:px-4 py-3 md:py-4 xl:py-3 bg-white hover:bg-gray-200 md:text-lg xl:text-base text-gray-800 font-semibold leading-tight shadow-md"
              >
                or JSON Schema
              </Link>
            </div>
          </div>
          <div
            className="flex-1 flex rounded-lg overflow-hidden shadow-lg"
            style={{ height: 360 }}
          >
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/KAy5pK0IRIc"
              frameBorder={0}
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
