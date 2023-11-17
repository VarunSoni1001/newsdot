import NewsCard from "@/components/NewsCard";
import formatTimeDifference from "@/utils/formatTimeDifference";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const SeachNews = () => {
  const router = useRouter();
  const { query } = router.query;

  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMoreNews, setHasMoreNews] = useState(true);
  const [page, setPage] = useState(1);
  const [cantLoad, setCantLoad] = useState(false);

  const fetchNews = async () => {
    setIsLoading(true);
    if (query !== undefined || query !== "") {
      try {
        const response = await fetch(
          `/api/news?page=${page}&query=${encodeURIComponent(query)}`
        );
        if (response.ok) {
          const data = await response.json();
          const newArticles = data.articles || [];
          setNews((prevNews) => [...prevNews, ...newArticles]);
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
        }
      } catch (error) {
        console.error("Error: ", error);
        setCantLoad(true);
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
      console.error("Query is not available");
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
      !isLoading &&
      hasMoreNews &&
      !cantLoad
    ) {
      fetchNews();
    }
  };

  const handleSearch = () => {
    setNews([]);
    setPage(1);
    fetchNews();
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [news, isLoading, hasMoreNews, cantLoad]);

  useEffect(() => {
    handleSearch();
    document.title = `News for ${query} | News.`;
  }, [query]);

  return (
    <main className="min-h-screen m-auto max-w-[95%] sm:max-w-[90%] md:max-w-[80%] lg:max-w-6xl">
      <p className="text-center text-xl font-bold text-neutral-800 dark:text-neutral-200 mt-10 mb-4">
        Showing Results for {query}...
      </p>
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
        <p className="text-center text-lg font-bold text-gray-500 dark:text-neutral-200 m-6 transition-all ease-in-out duration-300">
          Loading...
        </p>
      )}
      {!isLoading && !hasMoreNews && (
        <p className="text-center text-lg font-bold text-gray-500 dark:text-neutral-200 mb-6 transition-all ease-in-out duration-300">
          That's it!
        </p>
      )}
    </main>
  );
};

export default SeachNews;
