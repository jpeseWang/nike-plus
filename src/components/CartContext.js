"use client";
import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext({});

export function CartContextProvider({ children }) {
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  const [cartProducts, setCartProducts] = useState([]);
  useEffect(() => {
    if (cartProducts?.length > 0) {
      ls?.setItem("cart", JSON.stringify(cartProducts));
    }
  }, [cartProducts]);

  useEffect(() => {
    if (ls && ls.getItem("cart")) {
      setCartProducts(JSON.parse(ls.getItem("cart")));
    }
  }, []);
  function addProduct(productId) {
    setCartProducts((prev) => [...prev, productId]);
    toast.success("Product added successfully!");
  }
  function removeProduct(productId) {
    setCartProducts((prev) => prev.filter((id) => id !== productId));
    toast.info("Remove product successfully!");
  }
  function updateProductQuantity(productId, newQuantity) {
    setCartProducts((prev) =>
      prev.map((id) =>
        id === productId ? { id: productId, quantity: newQuantity } : id
      )
    );
  }

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        setCartProducts,
        addProduct,
        removeProduct,
        updateProductQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
