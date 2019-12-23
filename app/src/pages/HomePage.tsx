import uuid from "uuid/v4";
import React from "react";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";

const Header = () => (
  <div className="flex py-5 items-center border-b-2 border-gray-200 h-24 px-6 text-gray-600">
    <Logo />
    <div className="flex-1" />
    <a
      className="block flex items-center hover:text-gray-700 mr-5"
      href="https://twitter.com/zhigang1992"
    >
      <svg
        className="fill-current w-5 h-5"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <title>Twitter</title>
        <path d="M6.29 18.25c7.55 0 11.67-6.25 11.67-11.67v-.53c.8-.59 1.49-1.3 2.04-2.13-.75.33-1.54.55-2.36.65a4.12 4.12 0 0 0 1.8-2.27c-.8.48-1.68.81-2.6 1a4.1 4.1 0 0 0-7 3.74 11.65 11.65 0 0 1-8.45-4.3 4.1 4.1 0 0 0 1.27 5.49C2.01 8.2 1.37 8.03.8 7.7v.05a4.1 4.1 0 0 0 3.3 4.03 4.1 4.1 0 0 1-1.86.07 4.1 4.1 0 0 0 3.83 2.85A8.23 8.23 0 0 1 0 16.4a11.62 11.62 0 0 0 6.29 1.84" />
      </svg>
    </a>
    <a
      className="block flex items-center mr-5"
      href="https://github.com/zhigang1992/zenyatta"
    >
      <svg
        className="fill-current w-5 h-5"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <title>GitHub</title>
        <path d="M10 0a10 10 0 0 0-3.16 19.49c.5.1.68-.22.68-.48l-.01-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.1.39-1.99 1.03-2.69a3.6 3.6 0 0 1 .1-2.64s.84-.27 2.75 1.02a9.58 9.58 0 0 1 5 0c1.91-1.3 2.75-1.02 2.75-1.02.55 1.37.2 2.4.1 2.64.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85l-.01 2.75c0 .26.18.58.69.48A10 10 0 0 0 10 0" />
      </svg>
    </a>
  </div>
);

function ProjectInfo() {
  return (
    <div className="flex-1 mr-20">
      <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-4xl font-light leading-tight">
        A <b>strongly-typed</b>, <b>hosted</b> service for{" "}
        <span className="sm:block text-teal-500 font-normal">
          building JSON configurations endpoint.
        </span>
      </h1>
      <p className="mt-6 leading-relaxed text-lg text-gray-600">
        Zenyatta is a service that will allow you to create OTA update JSON
        service in seconds, also allows your teammates to edit the same JSON at
        any time.
      </p>
      <div className="flex mt-6 justify-start">
        <Link
          to={`/${uuid()}/typescript`}
          className="rounded-lg px-4 py-4 py-3 bg-gray-700 hover:bg-gray-800 text-base text-white font-semibold leading-tight shadow-md"
        >
          Get Started with TypeScript
        </Link>
        <Link
          to={`/${uuid()}/jsonSchema`}
          className="ml-4 rounded-lg px-4 py-4 py-3 text-base bg-white hover:bg-gray-200 text-gray-800 font-semibold leading-tight shadow-md"
        >
          or JSON Schema
        </Link>
      </div>
    </div>
  );
}

function IntroVideo() {
  return (
    <div
      className="flex-1 flex rounded-lg overflow-hidden shadow-lg"
      style={{ height: 360 }}
    >
      <iframe
        title="Demo Video"
        width="100%"
        height="100%"
        src="https://www.youtube.com/embed/gpXOlJHTS-g"
        frameBorder={0}
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen={true}
      />
    </div>
  );
}

const HomePage = () => {
  return (
    <div className="bg-gray-100">
      <div className="flex flex-col container mx-auto h-screen">
        <Header />
        <div className="flex-1 w-full px-6 pb-20 flex items-center">
          <ProjectInfo />
          <IntroVideo />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
