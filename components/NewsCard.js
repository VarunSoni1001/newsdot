import Link from "next/link";
import React, { useState } from "react";

const NewsCard = ({
  title,
  image,
  date,
  description,
  sourceName,
  newsLink,
}) => {
  const [imageError, setImageError] = useState(false);

  const fullURL = newsLink;
  const baseURL = new URL(fullURL).host;
  const urlIfImageIsNotThere =
    baseURL !== "" ? baseURL : new URL(fullURL).hostname;

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="m-2 md:m-4 lg:m-6">
      <Link
        href={newsLink}
        // title={`Visit ${sourceName}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="bg-white dark:bg-neutral-950 rounded-lg shadow-lg overflow-hidden border border-gray-300 dark:border-gray-600 flex flex-col h-full hover:scale-105 transition-all duration-300 ease-in-out">
          {image && !imageError ? (
            <img
              src={image}
              alt={title}
              loading="lazy"
              className="w-full h-48 object-cover bg-neutral-200 dark:bg-neutral-900"
              onError={handleImageError}
            />
          ) : (
            <>
              <div className="relative">
                <img
                  src="/news-image.png"
                  loading="lazy"
                  className="w-full h-48 object-contain bg-neutral-200 dark:bg-neutral-800 blur-[2px]"
                  alt={sourceName}
                />
                <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60"></div>
                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-neutral-300">
                  {urlIfImageIsNotThere}
                </span>
              </div>
            </>
          )}
          <div className="flex flex-col justify-between flex-grow p-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-neutral-100 mb-2">
                {title}
              </h2>
              <p className="text-gray-600 dark:text-neutral-300 line-clamp-3 mb-4">
                {description}
              </p>
            </div>
            <div className="flex items-end justify-between">
              <span className="text-sm text-gray-400 dark:text-gray-500">
                {sourceName}
              </span>
              <span className="text-sm text-gray-400 dark:text-gray-500">
                {date}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default NewsCard;
