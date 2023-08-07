export default async function getData(id) {
  // TODO: Change this when push to repo
  // https://nike-plus.vercel.app/api/products;
  // `http://localhost:3000//api/products/${id}`
  const res = await fetch(`https://nike-plus.vercel.app/api/products/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
