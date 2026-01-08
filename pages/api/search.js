import axios from "axios";
<<<<<<< HEAD
import * as cheerio from "cheerio";

export default async function handler(req, res) {
  try {
    const items = [];

    // DEMO DATA (SAFE FOR PORTFOLIO)
    for (let i = 1; i <= 10; i++) {
      items.push({
        title: `Sample Furniture ${i}`,
        price: `$${100 + i * 50}`,
        rating: 4.5 - i * 0.1,
        image: "https://via.placeholder.com/300",
        link: "https://example.com"
      });
    }

    res.status(200).json(items);
  } catch (err) {
    // ALWAYS return array
=======

export default async function handler(req, res) {
  const { query = "chair", country = "US" } = req.query;

  try {
    const response = await axios.get(
      "https://wayfair.p.rapidapi.com/products/search",
      {
        params: {
          keyword: query,
          country
        },
        headers: {
          "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
          "X-RapidAPI-Host": process.env.RAPIDAPI_HOST
        }
      }
    );

    const items =
      response.data?.products
        ?.filter(p => p.rating)
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 10)
        .map(p => ({
          title: p.name,
          price: p.price?.formatted,
          rating: p.rating,
          image: p.image?.url,
          link: p.url
        })) || [];

    res.status(200).json(items);
  } catch (error) {
>>>>>>> eac9719b403ee1292d9ee69fdb6b6a7dacabd3c7
    res.status(200).json([]);
  }
}
