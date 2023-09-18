"use client";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoadingComponent from "@/app/loading";
import { XMarkIcon as XMarkIconMini } from "@heroicons/react/20/solid";

export default function Example() {
  const session = useSession();
  console.log("CHECK > >", session);

  const router = useRouter();

  //NEW WAY TO FETCH DATA
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, mutate, error, isLoading } = useSWR(
    `/api/products?username=${session?.data?.user.name}`,
    fetcher
  );

  if (session.status === "loading") {
    return <LoadingComponent />;
  }
  if (session.data.role !== "admin") {
    router?.push("/marketplace");
  }
  if (session.status === "unauthenticated") {
    router?.push("/auth/login");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const price = e.target[1].value;
    const type = e.target[2].value;
    const description = e.target[3].value;
    const imageSrc = e.target[4].value;

    try {
      await fetch("/api/products", {
        method: "POST",
        body: JSON.stringify({
          name,
          price,
          type,
          description,
          imageSrc,
          username: session.data.user.name,
        }),
      });
      mutate();
      e.target.reset();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });
      mutate();
    } catch (err) {
      console.log(err);
    }
  };
  if (session.status === "authenticated") {
    return (
      <div className="bg-white">
        <p className="flex h-10 items-center justify-center bg-indigo-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
          Update product directly to the marketplace
        </p>

        <main className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Product Management
          </h1>

          <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
            <section aria-labelledby="cart-heading" className="lg:col-span-7">
              <h2 id="cart-heading" className="sr-only">
                Items in your shopping cart
              </h2>

              <ul
                role="list"
                className="divide-y divide-gray-200 border-b border-t border-gray-200"
              >
                {isLoading ? (
                  <LoadingComponent />
                ) : (
                  data?.map((product, productIdx) => (
                    <li key={product.id} className="flex py-6 sm:py-10">
                      <div className="flex-shrink-0">
                        <img
                          src={product.imageSrc}
                          alt={product.imageAlt}
                          className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                        <div className="relative pr-9 sm:grid  sm:gap-x-6 sm:pr-0">
                          <div>
                            <div className="flex justify-between">
                              <h3 className="text">
                                <a
                                  href={product.href}
                                  className="font-medium text-gray-700 hover:text-gray-800"
                                >
                                  {product.name}
                                </a>
                              </h3>
                            </div>
                            <div className="mt-1 flex text-sm">
                              <p className="text-gray-500">{product.type}</p>
                              {product.size ? (
                                <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">
                                  {product.type}
                                </p>
                              ) : null}
                            </div>
                            <p className="mt-1 text-sm font-medium text-gray-900">
                              ${product.price}
                            </p>
                            <p className="mt-1 text-sm text-gray-500 w-full">
                              {product.description}
                            </p>
                          </div>

                          <div className="mt-4 sm:mt-0 sm:pr-9">
                            <div className="absolute right-0 top-0">
                              <button
                                type="button"
                                className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
                              >
                                <span className="sr-only">Remove</span>
                                <XMarkIconMini
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                  onClick={() => handleDelete(product._id)}
                                />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))
                )}
              </ul>
            </section>

            {/* Order summary */}
            <form
              aria-labelledby="summary-heading"
              className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
              onSubmit={handleSubmit}
            >
              <h2
                id="summary-heading"
                className="text-xl font-medium text-gray-900"
              >
                Add a product
              </h2>

              <dl className="mt-6 space-y-4">
                <div className="grid grid-cols-12 gap-x-4 gap-y-6">
                  <div className="col-span-full">
                    <label
                      htmlFor="name"
                      className="block font-medium text-gray-700"
                    >
                      Name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="name"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-1.5"
                      />
                    </div>
                  </div>
                  <div className="col-span-full">
                    <label
                      htmlFor="price"
                      className="block font-medium text-gray-700"
                    >
                      Price ($)
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="price"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-1.5"
                      />
                    </div>
                  </div>
                  <div className="col-span-full">
                    <label
                      htmlFor="type"
                      className="block font-medium text-gray-700"
                    >
                      Type
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="type"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-1.5"
                      />
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="desc"
                      className="block font-medium text-gray-700"
                    >
                      Description
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="desc"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-1.5"
                      />
                    </div>
                  </div>
                  <div className="col-span-full">
                    <label
                      htmlFor="imgSrc"
                      className="block text font-medium text-gray-700"
                    >
                      Image address
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="imgSrc"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-1.5"
                      />
                    </div>
                  </div>
                </div>
              </dl>

              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    );
  }
}
