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
  function addProduct(productId, productPrice) {
    const updatedCart = cartProducts.map((product) =>
      product.id === productId
        ? { ...product, price: productPrice, quantity: product.quantity + 1 }
        : product
    );
    const productAlreadyInCart = updatedCart.some(
      (product) => product.id === productId
    );
    if (!productAlreadyInCart) {
      setCartProducts((prev) => [
        ...prev,
        { id: productId, price: productPrice, quantity: 1 },
      ]);
      toast.success("Product added successfully!");
    } else {
      toast.success("Product already");
      setCartProducts(updatedCart);
    }
  }

  function removeProduct(productId) {
    setCartProducts((prev) =>
      prev.filter((product) => product.id !== productId)
    );
    ls?.removeItem("cart");
    toast.info("Remove product successfully!");
  }

  function updateProduct(productId, newQuantity) {
    const updatedCart = cartProducts.map((product) =>
      product.id === productId ? { ...product, quantity: newQuantity } : product
    );
    console.log("lc", cartProducts.id);
    console.log("pro", productId);
    setCartProducts(updatedCart);
  }

  function editproduct(productId, newQuantity) {
    const updatedCart = cartProducts.map((product) =>
      product.id === productId
        ? { ...product, price: productPrice, quantity: newQuantity }
        : product
    );
    const productAlreadyInCart = updatedCart.some(
      (product) => product.id === productId
    );
    if (!productAlreadyInCart) {
      setCartProducts((prev) => [
        ...prev,
        { id: productId, price: productPrice, quantity: 1 },
      ]);
      toast.success("Product added successfully!");
    } else {
      toast.success("Product already");
      setCartProducts(updatedCart);
    }
  }

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        setCartProducts,
        addProduct,
        removeProduct,
        updateProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
