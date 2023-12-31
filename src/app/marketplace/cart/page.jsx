"use client";
import { Fragment, useContext, useEffect, useState } from "react";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import { CartContext } from "@/contexts/CartContext";
import { useRouter } from "next/navigation";

import {
  CheckIcon,
  ClockIcon,
  QuestionMarkCircleIcon,
  XMarkIcon as XMarkIconMini,
} from "@heroicons/react/20/solid";
import LoadingComponent from "@/app/loading";
import getData from "@/utils/getData";
const relatedProducts = [
  {
    id: 1,
    name: "Nike Pegasus 40 SE",
    href: "#",
    imageSrc:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/41a4652a-8447-4d1d-8a58-8797769eb423/pegasus-40-se-road-running-shoes-1jMJKm.png",
    imageAlt: "Front of Billfold Wallet in natural leather.",
    price: "$118",
    color: "Natural",
  },
];

export default function Example() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [localProducts, setLocalProducts] = useState([]);
  const router = useRouter();
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  const { cartProducts, removeProduct, updateProduct } =
    useContext(CartContext);
  useEffect(() => {
    const lp = JSON.parse(localStorage.getItem("cart"));
    if (lp) {
      setLocalProducts(lp);
    }
  }, []);
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const productData = await Promise.all(
          cartProducts.map((productId) => getData(productId.id))
        );

        const updatedProducts = productData.map((product) => {
          const localProduct = localProducts.find(
            (lp) => lp.id === product._id
          );
          return {
            ...product,
            quantity: localProduct.quantity,
          };
        });

        setProducts(updatedProducts);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchProductData();
  }, [cartProducts, localProducts]);

  const totalPrice = localProducts.reduce((total, product) => {
    return total + parseInt(product.price) * product.quantity;
  }, 0);

  return (
    <>
      <div className="bg-white">
        <main className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Shopping Cart
          </h1>
          <button
            class="text-base font-semibold text-indigo-600 hover:text-indigo-500 mt-6"
            onClick={() => {
              router.push("/marketplace");
            }}
          >
            &larr; Back to Marketplace
          </button>
          {isLoading && <LoadingComponent />}

          {!isLoading && !products.length && (
            <div className="mt-6 ">
              <h3 class="mt-2 text-lg font-semibold text-gray-900">
                {" "}
                Your cart is Empty.
              </h3>
              <p class="mt-1 text-base text-gray-500"> Go shopping now!</p>

              <img
                className="h-60 w-auto"
                src="https://assets.materialup.com/uploads/16e7d0ed-140b-4f86-9b7e-d9d1c04edb2b/preview.png"
              ></img>
              <button
                onClick={() => {
                  router.push("/marketplace");
                }}
              >
                <span class="inline-flex flex-end rounded-full bg-indigo-50 px-2 py-1 text-lg font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10 ml-40 hover:bg-blue-400 hover:text-white">
                  Shop now!
                </span>
              </button>
            </div>
          )}
          <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
            <section aria-labelledby="cart-heading" className="lg:col-span-7">
              <h2 id="cart-heading" className="sr-only">
                Items in your shopping cart
              </h2>
              {products.length > 0 && (
                <div>
                  <ul
                    role="list"
                    className="divide-y divide-gray-200 border-b border-t border-gray-200"
                  >
                    {products.map((product, productIdx) => (
                      <li key={product.id} className="flex py-6 sm:py-10">
                        <div className="flex-shrink-0">
                          <img
                            src={product.imageSrc}
                            alt={product.imageAlt}
                            className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                          <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                            <div>
                              <div className="flex justify-between">
                                <h3 className="text-sm">
                                  <a
                                    href={`/marketplace/overview/${product._id}`}
                                    className="font-medium text-lg text-gray-700 hover:text-gray-800 cursor-pointer"
                                  >
                                    {product.name}
                                  </a>
                                </h3>
                              </div>
                              <div className="mt-1 flex text-medium">
                                <p className="text-gray-500">{product.type}</p>

                                {product.size ? (
                                  <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">
                                    {product.size}
                                  </p>
                                ) : null}
                              </div>
                              <p className="mt-1 text-base font-medium text-gray-900">
                                ${product.price}
                              </p>
                              <p>Quantity: {product.quantity}</p>
                            </div>

                            <div className="mt-4 sm:mt-0 sm:pr-9">
                              <label
                                htmlFor={`quantity-${productIdx}`}
                                className="sr-only"
                              >
                                Quantity, {product.name}
                              </label>
                              <select
                                id={`quantity-${productIdx}`}
                                name={`quantity-${productIdx}`}
                                className="max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                                value={product.quantity}
                                onChange={(e) => {
                                  const newQuantity = parseInt(
                                    e.target.value,
                                    10
                                  );
                                  updateProduct(product._id, newQuantity);
                                  const updatedProducts = products.map((p) =>
                                    p.id === product.id
                                      ? { ...p, quantity: newQuantity }
                                      : p
                                  );

                                  setLocalProducts(updatedProducts);
                                  setProducts(updatedProducts);
                                  window.location.reload();
                                }}
                              >
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                                <option value={6}>6</option>
                                <option value={7}>7</option>
                                <option value={8}>8</option>
                              </select>

                              <div className="absolute right-0 top-0">
                                <button
                                  type="button"
                                  className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
                                  onClick={() => {
                                    removeProduct(product._id);
                                  }}
                                >
                                  <span className="sr-only">Remove</span>
                                  <XMarkIconMini
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </button>
                              </div>
                            </div>
                          </div>

                          <p className="mt-4 flex space-x-2 text-sm text-gray-700">
                            {product.inStock ? (
                              <CheckIcon
                                className="h-5 w-5 flex-shrink-0 text-green-500"
                                aria-hidden="true"
                              />
                            ) : (
                              <ClockIcon
                                className="h-5 w-5 flex-shrink-0 text-gray-300"
                                aria-hidden="true"
                              />
                            )}

                            <span>
                              {product.inStock
                                ? "In stock"
                                : `Ships in ${product.leadTime}`}
                            </span>
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
            {/* Order summary */}
            {!!products.length && (
              <section
                aria-labelledby="summary-heading"
                className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
              >
                <h2
                  id="summary-heading"
                  className="text-lg font-medium text-gray-900"
                >
                  Order summary
                </h2>

                <dl className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <dt className="text-sm text-gray-600">Subtotal</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      ${totalPrice}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <dt className="flex items-center text-sm text-gray-600">
                      <span>Shipping estimate</span>
                      <a
                        href="#"
                        className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"
                      >
                        <span className="sr-only">
                          Learn more about how shipping is calculated
                        </span>
                        <QuestionMarkCircleIcon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      </a>
                    </dt>
                    <dd className="text-sm font-medium text-gray-900">$5.00</dd>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <dt className="flex text-sm text-gray-600">
                      <span>Tax estimate</span>
                      <a
                        href="#"
                        className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"
                      >
                        <span className="sr-only">
                          Learn more about how tax is calculated
                        </span>
                        <QuestionMarkCircleIcon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      </a>
                    </dt>
                    <dd className="text-sm font-medium text-gray-900">
                      ${(totalPrice * 0.1).toFixed(2)}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <dt className="text-base font-medium text-gray-900">
                      Order total
                    </dt>
                    <dd className="text-base font-medium text-gray-900">
                      ${(totalPrice + totalPrice * 0.1 + 5).toFixed(2)}
                    </dd>
                  </div>
                </dl>

                <div className="mt-6">
                  <button
                    className="w-full rounded-full border border-transparent bg-black px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                    onClick={() => {
                      ls.setItem("totalPrice", totalPrice);
                      router.push("/order/checkout");
                    }}
                  >
                    Checkout
                  </button>
                </div>
              </section>
            )}
          </div>

          {/* Related products */}
          <section aria-labelledby="related-heading" className="mt-24">
            <h2
              id="related-heading"
              className="text-2xl font-medium text-gray-900"
            >
              You may also like
            </h2>

            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {relatedProducts.map((relatedProduct) => (
                <div key={relatedProduct.id} className="group relative">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md lg:aspect-none group-hover:opacity-75 lg:h-80">
                    <img
                      src={relatedProduct.imageSrc}
                      alt={relatedProduct.imageAlt}
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <a href={relatedProduct.href}>
                          <span
                            aria-hidden="true"
                            className="absolute inset-0"
                          />
                          {relatedProduct.name}
                        </a>
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {relatedProduct.color}
                      </p>
                    </div>
                    <p className="text-base font-medium text-gray-900">
                      {relatedProduct.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
