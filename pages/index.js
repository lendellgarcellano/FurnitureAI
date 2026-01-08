import { useState } from "react";
import SkeletonCard from "../components/SkeletonCard";

export default function Home() {
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("US");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const search = async () => {
    setLoading(true);
    const res = await fetch(
      `/api/search?query=${query}&country=${country}`
    );
    const data = await res.json();
    setItems(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Furniture Finder</h1>
        <p className="text-gray-600 mb-6">
          Find top-rated furniture across countries
        </p>

        <div className="flex gap-3 mb-8">
          <input
            className="border rounded px-4 py-2 w-64"
            placeholder="Search furniture..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />

          <select
            className="border rounded px-4 py-2"
            value={country}
            onChange={e => setCountry(e.target.value)}
          >
            <option value="US">USA</option>
            <option value="CA">Canada</option>
            <option value="GB">UK</option>
            <option value="AU">Australia</option>
            <option value="DE">Germany</option>
          </select>

          <button
            onClick={search}
            className="bg-black text-white px-6 py-2 rounded"
          >
            Search
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))
            : items.map((item, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl shadow p-4"
                >
                  <img
                    src={item.image}
                    className="h-40 w-full object-cover rounded"
                  />
                  <h3 className="font-semibold mt-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-500">{item.price}</p>
                  <p className="text-yellow-500">
                    ⭐ {item.rating}
                  </p>
                  <a
                    href={item.link}
                    target="_blank"
                    className="text-blue-600 text-sm"
                  >
                    View Product →
                  </a>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}
