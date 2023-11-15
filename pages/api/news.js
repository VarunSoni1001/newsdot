const apiKey = process.env.SECRET_NEWS_API_KEY;

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { page, category } = req.query;

    if (!apiKey) {
      res.status(500).json({ error: "API key is undefined or not available." });
    }

    var url = category
      ? `https://newsapi.org/v2/top-headlines?country=in&category=${category}&page=${page}`
      : `https://newsapi.org/v2/top-headlines?country=in&page=${page}`;

    try {
      const response = await fetch(url, {
        headers: {
          "X-Api-Key": apiKey,
        },
      });

      if (response.ok) {
        const data = await response.json();
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
