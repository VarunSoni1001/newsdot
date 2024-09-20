const apiKey = process.env.SECRET_NEWS_API_KEY;

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { page, category, query } = await req.query;

    if (!apiKey) {
      res.status(500).json({ error: "API key is undefined or not available." });
    }

    var url =
      category && !query && page
        ? `https://newsapi.org/v2/top-headlines?category=${category}&page=${page}`
        : query && !category && page
        ? `https://newsapi.org/v2/everything?language=en&q=${encodeURIComponent(
            query
          )}&sortBy=publishedAt&page=${page}`
        : // &searchIn=title,description,content for above one
          `https://newsapi.org/v2/top-headlines?country=us&page=${page}`;

    try {
      const response = await fetch(url, {
        headers: {
          "X-Api-Key": apiKey,
        },
      });

      if (response.ok) {
        const data = await response.json();

        const filteredArticles = data.articles.filter((article) => {
          return (
            article?.source?.name !== "[Removed]" ||
            article?.title !== "[Removed]" ||
            article?.description !== "[Removed]"
          );
        });

        data.articles = filteredArticles;

        res.status(200).json(data);
      } else {
        res.status(response.status).json({ error: response.statusText });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ message: "Invalid method" });
  }
}
