import NewsCard from "@/components/NewsCard";
import formatTimeDifference from "@/utils/formatTimeDifference";
import React, { useEffect, useState } from "react";

const technology = () => {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMoreNews, setHasMoreNews] = useState(true);
  const [page, setPage] = useState(1);
  const [cantLoad, setCantLoad] = useState(false);
  const [noNews, setNoNews] = useState(false);

  const fetchNews = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/news?page=${page}&category=technology`
      );
      if (response.ok) {
        const data = await response.json();
        if (data.articles) {
          setNoNews(false);
        }
        const newArticles = data.articles || [];
        setNews([...news, ...newArticles]);
        setPage(page + 1);
        if (newArticles.length === 0 || news.length >= data.totalResults) {
          setHasMoreNews(false);
        } else {
          setHasMoreNews(true);
        }
        setCantLoad(false);
      } else {
        console.error("Error fetching news");
        setCantLoad(true);
        setNoNews(true);
      }
    } catch (error) {
      console.error("Error: ", error);
      setCantLoad(true);
      setNoNews(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
      !isLoading &&
      hasMoreNews &&
      !noNews &&
      !cantLoad // prevent loading if there are no more articles
    ) {
      fetchNews();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [news, isLoading, hasMoreNews, cantLoad]);

  useEffect(() => {
    document.title = "Top-Headlines on Technology | News.";
    fetchNews();
  }, []);

  return (
    <main className="min-h-screen m-auto max-w-[95%] sm:max-w-[90%] md:max-w-[80%] lg:max-w-6xl">
      {!noNews && (
        <p className="text-center text-xl font-bold text-neutral-800 dark:text-neutral-200 mt-10 mb-4">
          Top-Headlines on Technology
        </p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {news?.map((article, index) => (
          <NewsCard
            key={index}
            title={article.title}
            image={article.urlToImage}
            date={formatTimeDifference(article.publishedAt)}
            description={article.description}
            sourceName={article.source.name}
            newsLink={article.url}
          />
        ))}
      </div>
      {isLoading && (
        <p className="text-center text-lg font-bold text-gray-500 dark:text-neutral-200 m-6 transition-all dark:transition-all ease-in-out dark:ease-in-out duration-300 dark:duration-300">
          Loading...
        </p>
      )}
      {!isLoading && !hasMoreNews && !noNews && (
        <p className="text-center text-lg font-bold text-gray-500 dark:text-neutral-200 mb-6 transition-all dark:transition-all ease-in-out dark:ease-in-out duration-300 dark:duration-300">
          That's it!
        </p>
      )}
      {noNews && !isLoading && (
        <p className="text-center mt-40 text-lg font-bold text-gray-500 dark:text-neutral-300 mb-6 transition-all dark:transition-all ease-in-out dark:ease-in-out duration-300 dark:duration-300">
          No news is available.
        </p>
      )}
    </main>
  );
};

export default technology;
