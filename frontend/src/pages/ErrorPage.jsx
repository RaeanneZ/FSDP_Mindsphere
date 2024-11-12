import React from "react";
import { introBg } from "../utils";

const ErrorPage = () => {
  return (
    <div
      className="text-center w-screen h-screen flex flex-col justify-center items-center bg-cover bg-center"
      style={{ backgroundImage: `url(${introBg})` }}
    >
      <h1 className="text-9xl font-bold text-gray-800">404</h1>
      <p className="text-lg text-gray-600 mt-4">
        Whoops, looks like there is nothing here.
        <br />
        Let’s go{" "}
        <a href="/" className="text-yellow">
          <b>
            <u>home</u>
          </b>
        </a>
      </p>
    </div>
  );
};

export default ErrorPage;
