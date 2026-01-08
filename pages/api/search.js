import axios from "axios";
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
    res.status(200).json([]);
  }
}
