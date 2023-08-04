"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
const API_HOSTNAME = process.env.API_HOSTNAME || "localhost:3000";
async function getData() {
  const res = await fetch(`http://${API_HOSTNAME}/api/products`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default function Page() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData()
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <main>
      <div>
        {data.map((item) => (
          <div key={item._id} className="py-4 px-6">
            {item.name}: {item.price}
            <img src={item.imageSrc} alt="" />
            <Link href={`/marketplace/overview/${item._id}`}>Go</Link>
          </div>
        ))}
      </div>
    </main>
  );
}
