
import { useState } from "react";

export default function Home() {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const search = async () => {
    setLoading(true);
    const res = await fetch(`/api/search?query=${query}`);
    const data = await res.json();
    setItems(Array.isArray(data) ? data : []);
    setItems(data);
    setLoading(false);
  };

  return (
    <div style={{ padding: 40, fontFamily: "Arial" }}>
      <h1>Furniture Finder</h1>
      <p>Search top-rated furniture available in your country.</p>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search furniture..."
        style={{ padding: 10, width: 300 }}
      />
      <button onClick={search} style={{ marginLeft: 10, padding: 10 }}>
        Search
      </button>

      {loading && <p>Loading...</p>}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 20, marginTop: 30 }}>
        {Array.isArray(items) && items.map((item, i) => (
          <div key={i} style={{ border: "1px solid #ddd", borderRadius: 8, padding: 15 }}>
            <img src={item.image} alt="" style={{ width: "100%", height: 180, objectFit: "cover" }} />
            <h3>{item.title}</h3>
            <p>{item.price}</p>
            <p>⭐ {item.rating}</p>
            <a href={item.link} target="_blank">View Product</a>
          </div>
        ))}
      </div>
    </div>
  );
}
