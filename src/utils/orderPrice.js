// orderUtils.js
export const calculateTotalPrice = (products) => {
  const totalPrice = products.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );
  return totalPrice; // Adding taxes
};
