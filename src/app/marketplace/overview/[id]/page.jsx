"use client";
import { useState, useEffect, useContext } from "react";
import {
  Dialog,
  Disclosure,
  Popover,
  RadioGroup,
  Tab,
  Transition,
} from "@headlessui/react";
import {
  HeartIcon,
  MagnifyingGlassIcon,
  MinusIcon,
  PlusIcon,
  ShoppingBagIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/20/solid";
import { CartContext } from "@/contexts/CartContext";
import { useRouter, useSearchParams } from "next/navigation";
import getData from "@/utils/getData";
import LoadingComponent from "@/app/loading";
import Link from "next/link";
const product = {
  colors: [
    {
      name: "Washed Black",
      bgColor: "bg-gray-700",
      selectedColor: "ring-gray-700",
    },
    { name: "White", bgColor: "bg-white", selectedColor: "ring-gray-400" },
    {
      name: "Washed Gray",
      bgColor: "bg-gray-500",
      selectedColor: "ring-gray-500",
    },
  ],
  description: `
    <p>The Zip Tote Basket is the perfect midpoint between shopping tote and comfy backpack. With convertible straps, you can hand carry, should sling, or backpack this convenient and spacious bag. The zip top and durable canvas construction keeps your goods protected for all-day use.</p>
  `,
  details: [
    {
      name: "Features",
      items: [
        "Multiple strap configurations",
        "Spacious interior with top zip",
        "Leather handle and tabs",
        "Interior dividers",
        "Stainless strap loops",
        "Double stitched construction",
        "Water-resistant",
      ],
    },
    // More sections...
  ],
};
const colorVariants = ["Black", "White", "Blue"];
const sizeVariants = ["37", "38", "39", "40", "41", "42"];
const relatedProducts = [
  {
    id: 1,
    name: "Air Jordan 1 Mid SE",
    color: "Men's Shoes",
    href: "#",
    imageSrc:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/22b7ce96-431b-432a-bd1a-ed32894a4430/air-jordan-1-mid-se-mens-shoes-vw6Hxn.png",
    imageAlt:
      "Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.",
    price: "$135",
  },
  // More products...
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductOverview({ params }) {
  const { addProduct } = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(true);

  const [data, setData] = useState({});
  const searchParams = useSearchParams();
  const selectedColor = searchParams.get("color");
  const selectedSize = searchParams.get("size");
  const router = useRouter();
  const searchParms = useSearchParams();
  useEffect(() => {
    getData(params.id)
      .then((data) => setData(data))
      .catch((error) => console.error(error));
    setIsLoading(false);
  }, [params.id]);

  const addFeaturedToCart = () => {
    addProduct(data._id, data.price);
  };

  return (
    <div className="bg-white">
      <main className="mx-auto max-w-7xl sm:px-6 sm:pt-16 lg:px-8">
        <button
          class="text-base font-semibold text-indigo-600 hover:text-indigo-500 my-6 ml-2"
          onClick={() => {
            router.push("/marketplace");
          }}
        >
          &larr; Back to Marketplace
        </button>
        {isLoading && <LoadingComponent />}

        <div className="mx-auto max-w-2xl lg:max-w-none">
          {!isLoading && (
            <>
              <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
                <Tab.Group as="div" className="flex flex-col-reverse">
                  <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
                    <Tab.List className="grid grid-cols-4 gap-6">
                      <Tab
                        key={data._id}
                        className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                      >
                        {({ selected }) => (
                          <>
                            <span className="sr-only">{data._id}</span>
                            <span className="absolute inset-0 overflow-hidden rounded-md">
                              <img
                                src={data.imageSrc}
                                alt=""
                                className="h-full w-full object-cover object-center"
                              />
                            </span>
                            <span
                              className={classNames(
                                selected
                                  ? "ring-indigo-500"
                                  : "ring-transparent",
                                "pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2"
                              )}
                              aria-hidden="true"
                            />
                          </>
                        )}
                      </Tab>
                    </Tab.List>
                  </div>

                  <Tab.Panels className="aspect-h-1 aspect-w-1 w-full">
                    <Tab.Panel key={data._id}>
                      <img
                        src={data.imageSrc}
                        className="h-full w-full object-cover object-center sm:rounded-lg"
                      />
                    </Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>

                {/* Product info */}
                <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                  <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
                    {data.name}
                  </h1>

                  <div className="mt-3">
                    <h2 className="sr-only">Product information</h2>
                    <p className="text-2xl tracking-tight text-gray-900">
                      ${data.price}
                    </p>
                  </div>

                  {/* Reviews */}
                  <div className="mt-3">
                    <h3 className="sr-only">Reviews</h3>
                    <div className="flex items-center">
                      <div className="flex items-center">
                        {[0, 1, 2, 3, 4].map((rating) => (
                          <StarIcon
                            key={rating}
                            className={classNames(
                              product.rating > rating
                                ? "text-black"
                                : "text-gray-300",
                              "h-5 w-5 flex-shrink-0"
                            )}
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                      <p className="sr-only">{product.rating} out of 5 stars</p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="sr-only">Description</h3>

                    <div
                      className="space-y-6 text-base text-gray-700"
                      dangerouslySetInnerHTML={{ __html: data.description }}
                    />
                  </div>

                  <div className="mt-6">
                    {/* Colors */}
                    <div className="mt-4">
                      <h3 className="text-sm text-gray-600">Colors</h3>

                      <RadioGroup value={selectedColor} className="mt-2">
                        <RadioGroup.Label className="sr-only">
                          Choose a color
                        </RadioGroup.Label>
                        <div className="flex items-center space-x-3">
                          {colorVariants.map((color, index) => (
                            <Link
                              key={index}
                              href={`?color=${color}&size=${selectedSize}`}
                              className={`bg-gray-100 px-2 py-1 rounded border-2 ${
                                selectedColor === color
                                  ? "border-blue-500"
                                  : "border-gray-200"
                              } `}
                            >
                              {color}
                            </Link>
                          ))}
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="mt-4">
                      <h3 className="text-sm text-gray-600">Select Size</h3>

                      <RadioGroup value={selectedSize} className="mt-2">
                        <RadioGroup.Label className="sr-only">
                          Choose a color
                        </RadioGroup.Label>
                        <div className="flex items-center space-x-3">
                          {sizeVariants.map((size, index) => (
                            <Link
                              key={index}
                              href={`?color=${selectedColor}&size=${size}`}
                              className={`bg-gray-100 px-2 py-1 rounded border-2 ${
                                selectedSize === size
                                  ? "border-blue-500"
                                  : "border-gray-200"
                              } `}
                            >
                              EU {size}
                            </Link>
                          ))}
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="mt-10 flex">
                      <button
                        onClick={addFeaturedToCart}
                        className="mr-4 flex flex-1 items-center justify-center rounded-full border border-transparent bg-black px-5 py-3 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                      >
                        Add to bag
                      </button>

                      <button
                        type="button"
                        className="flex flex-1 items-center justify-center rounded-full text-gray-900 hover:bg-gray-100 hover:text-gray-500 border-2 px-5 py-3 text-base font-medium"
                      >
                        {" "}
                        Favourite&nbsp;&nbsp;
                        <HeartIcon
                          className="h-6 w-6 flex-shrink-0"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </div>

                  <section aria-labelledby="details-heading" className="mt-12">
                    <h2 id="details-heading" className="sr-only">
                      Additional details
                    </h2>

                    <div className="divide-y divide-gray-200 border-t">
                      {product.details.map((detail) => (
                        <Disclosure as="div" key={detail.name}>
                          {({ open }) => (
                            <>
                              <h3>
                                <Disclosure.Button className="group relative flex w-full items-center justify-between py-6 text-left">
                                  <span
                                    className={classNames(
                                      open
                                        ? "text-indigo-600"
                                        : "text-gray-900",
                                      "text-sm font-medium"
                                    )}
                                  >
                                    {detail.name}
                                  </span>
                                  <span className="ml-6 flex items-center">
                                    {open ? (
                                      <MinusIcon
                                        className="block h-6 w-6 text-indigo-400 group-hover:text-indigo-500"
                                        aria-hidden="true"
                                      />
                                    ) : (
                                      <PlusIcon
                                        className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                        aria-hidden="true"
                                      />
                                    )}
                                  </span>
                                </Disclosure.Button>
                              </h3>
                              <Disclosure.Panel
                                as="div"
                                className="prose prose-sm pb-6"
                              >
                                <ul role="list">
                                  {detail.items.map((item) => (
                                    <li key={item}>{item}</li>
                                  ))}
                                </ul>
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                      ))}
                    </div>
                  </section>
                </div>
              </div>
            </>
          )}

          <section
            aria-labelledby="related-heading"
            className="mt-10 border-t border-gray-200 px-4 py-16 sm:px-0"
          >
            <h2
              id="related-heading"
              className="text-xl font-bold text-gray-900"
            >
              Customers also bought
            </h2>

            <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
              {relatedProducts.map((product) => (
                <div key={product.id}>
                  <div className="relative">
                    <div className="relative h-72 w-full overflow-hidden rounded-lg">
                      <img
                        src={product.imageSrc}
                        alt={product.imageAlt}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="relative mt-4">
                      <h3 className="text-sm font-medium text-gray-900">
                        {product.name}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {product.color}
                      </p>
                    </div>
                    <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
                      <div
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
                      />
                      <p className="relative text-lg font-semibold text-white">
                        {product.price}
                      </p>
                    </div>
                  </div>
                  <div className="mt-6">
                    <button
                      className="relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200"
                      onClick={addFeaturedToCart}
                    >
                      Add to bag
                      <span className="sr-only">, {product.name}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
