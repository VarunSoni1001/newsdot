import Link from "next/link";
import React from "react";

const Error404 = () => {
  return (
    <section className="px-4 relative font-satoshi">
      <div className="container mx-auto text-center flex justify-center flex-col min-h-[85vh] items-center relative z-10">
        <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl mb-4 dark:text-gray-200">
          Oops!{" "}
          <span className="font-bold font-satoshi bg-gradient-to-l from-black via-gray-500 to-gray-600 bg-clip-text text-transparent background-animate dark:from-gray-600 dark:via-gray-500 dark:to-black">
            404
          </span>
        </h1>
        <p className="text-sm md:text-sm lg:text-lg xl:text-lg 2xl:text-xl dark:text-gray-300">
          The page you're looking for doesn't exist.
          <br />
          But don't worry, you can navigate back to the{" "}
          <Link
            href="/"
            className="underline font-bold dark:text-gray-200 text-fuchsia-900"
          >
            home
          </Link>
          .
        </p>
      </div>
    </section>
  );
};

export default Error404;
