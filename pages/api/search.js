import axios from "axios";

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
    res.status(200).json([]);
  }
}
