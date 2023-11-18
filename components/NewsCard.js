import Link from "next/link";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

const NewsCard = ({
  title,
  image,
  date,
  description,
  sourceName,
  newsLink,
}) => {
  const [imageError, setImageError] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  const fullURL = newsLink;
  const baseURL = new URL(fullURL).host;
  const urlIfImageIsNotThere =
    baseURL !== "" ? baseURL : new URL(fullURL).hostname;

  const handleImageError = () => {
    setImageError(true);
  };

  const variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <AnimatePresence>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        exit="hidden"
        variants={variants}
        className="m-2 md:m-4 lg:m-6"
      >
        <Link href={newsLink} target="_blank" rel="noopener noreferrer">
          <div className="bg-white dark:bg-neutral-950 rounded-lg shadow-lg overflow-hidden border border-gray-300 dark:border-gray-600 flex flex-col h-full hover:scale-105 transition-all dark:transition-all duration-300 dark:duration-300 ease-in-out dark:ease-in-out">
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
                  <span className="absolute w-full text-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">
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
                <p className="text-gray-600 dark:text-neutral-300 mb-4">
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
      </motion.div>
    </AnimatePresence>
  );
};

export default NewsCard;
