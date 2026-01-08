
import axios from "axios";
import * as cheerio from "cheerio";

export default async function handler(req, res) {
  const { query = "chair" } = req.query;

  try {
    // Example site structure (for demo/portfolio use)
    const url = `https://example.com/search?q=${query}`;
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const items = [];

    $(".product").each((_, el) => {
      items.push({
        title: $(el).find(".title").text(),
        price: $(el).find(".price").text(),
        rating: parseFloat($(el).find(".rating").text()) || 0,
        image: $(el).find("img").attr("src"),
        link: $(el).find("a").attr("href")
      });
    });

    const topRated = items
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 10);

    res.status(200).json(topRated);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch furniture data" });
  }
}
