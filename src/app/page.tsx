/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
"use client";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css";
const callouts = [
  {
    id: 1,
    name: "Nike Tech Hera",
    price: 3239,
    description: "Men's Shoes",
    imageSrc:
      "https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_1.5/h_590,c_limit/41b3460d-cdd6-4d03-8a0d-d0cf026f6aaa/tech-hera-shoes-8MQgCL.png",
    imageAlt:
      "Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.",
    href: "#",
  },
  {
    id: 2,
    name: "Nike Cortez",
    price: 2499,
    description: "Women's Shoes",
    imageSrc:
      "https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_1.5/h_590,c_limit/7d511351-e68f-4887-8cd0-9c956c45f41f/cortez-shoes-svdKM9.png",
    imageAlt:
      "Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.",
    href: "#",
  },
  {
    id: 3,
    name: "Nike Mornarch",
    price: 3239,
    description: "Women's Shoes",
    imageSrc:
      "https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_1.5/h_590,c_limit/dae5b2b3-4234-4d15-8065-8c22605dc1d1/tech-hera-shoes-JlV5km.png",
    imageAlt: "Collection of four insulated travel bottles on wooden shelf.",
    href: "#",
  },
  {
    id: 4,
    name: "Jumpman MVP",
    price: 4849,
    description: "Men's Shoes",
    imageSrc:
      "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/89bd904a-dfae-4f50-930e-768e016750e0/jumpman-mvp-shoes-JV1HCs.png",
    imageAlt: "Collection of four insulated travel bottles on wooden shelf.",
    href: "#",
  },
  {
    id: 5,
    name: "Air Jordan 1 Mid SE",
    price: 3669,
    description: "Men's Shoes",
    imageSrc:
      "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/99af6dea-fbad-43d0-983b-ac3197a4ea70/air-jordan-1-mid-shoes-86f1ZW.png",
    imageAlt: "Collection of four insulated travel bottles on wooden shelf.",
    href: "#",
  },
  {
    id: 6,
    name: "Air Jordan XXXVII PF",
    price: 5129,
    description: "Women's Shoes",
    imageSrc:
      "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/bd9a8dc3-01d4-41dc-a390-ef12addf1373/air-jordan-xxxvii-low-pf-basketball-shoes-7z7ltC.png",
    imageAlt: "Collection of four insulated travel bottles on wooden shelf.",
    href: "#",
  },
];
const navigation = {
  icons: [
    { name: "Air Force 1", href: "#" },
    { name: "Huarache", href: "#" },
    { name: " Air Max 90", href: "#" },
    { name: "Air Max 95", href: "#" },
  ],
  shoes: [
    { name: "All Shoes ", href: "#" },
    { name: "Custom Shoes", href: "#" },
    { name: "Jordan Shoes", href: "#" },
    { name: " Running Shoes", href: "#" },
  ],
  clothing: [
    { name: "All Clothing", href: "#" },
    { name: "Modest Wear", href: "#" },
    { name: "Hoodies & Pullovers", href: "#" },
    { name: " Shirts & Tops", href: "#" },
  ],
  kids: [
    { name: "Infant & Toddler Shoes", href: "#" },
    { name: "Kids' Shoes", href: "#" },
    { name: "Kids' Jordan Shoe", href: "#" },
    { name: "Kids' Basketball Shoes", href: "#" },
  ],
};
const slider = [
  {
    id: 1,
    name: "Nike Air Force 1 '07",
    price: 2929,
    description: "Men's Shoes",
    imageSrc:
      "https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_2.0/w_479,c_limit/e6da41fa-1be4-4ce5-b89c-22be4f1f02d4/air-force-1-07-shoes-WrLlWX.png",
    imageAlt: "",
    href: "#",
  },
  {
    id: 2,
    name: "Nike Air Force 1 '07",
    price: 2929,
    description: "Women's Shoes",
    imageSrc:
      "https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_2.0/w_479,c_limit/e777c881-5b62-4250-92a6-362967f54cca/air-force-1-07-shoe-NMmm1B.png",
    imageAlt: "",
    href: "#",
  },
  {
    id: 3,
    name: "Nike Dri-FIT ",
    price: 1739,
    description: "Men's Short-Sleeve",
    imageSrc:
      "https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_2.0/w_479,c_limit/ff7e4ad8-6b88-48e0-a8be-251f3acf4b32/dri-fit-short-sleeve-basketball-top-H50T3m.png",
    imageAlt: "Collection of four insulated travel bottles on wooden shelf.",
    href: "#",
  },
  {
    id: 4,
    name: "Nike Dri-FIT",
    price: 869,
    description: "Women's T-shirt",
    imageSrc:
      "https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_2.0/w_479,c_limit/58d6119e-0de8-454f-9a6e-0a08ac976bae/dri-fit-swoosh-fly-t-shirt-LcsRwS.png",
    imageAlt: "Collection of four insulated travel bottles on wooden shelf.",
    href: "#",
  },
  {
    id: 5,
    name: "Nike Motiva Premium",
    price: 3239,
    description: "Women's Premium Walking Shoes",
    imageSrc:
      "https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_2.0/h_554,c_limit/32a275c6-3ab0-4fe0-b71d-4131418f83a8/motiva-walking-shoes-162GNq.png",
    imageAlt: "Collection of four insulated travel bottles on wooden shelf.",
    href: "#",
  },
  {
    id: 6,
    name: "Nike Downshifter 12",
    price: 1909,
    description: "Women's Road Running Shoes",
    imageSrc:
      "https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_2.0/h_554,c_limit/bc21bec1-52e5-4c9e-9f59-0d7145b86a1f/downshifter-12-road-running-shoes-NxhwFD.png",
    imageAlt: "Collection of four insulated travel bottles on wooden shelf.",
    href: "#",
  },
];

export default function Home() {
  return (
    <div>
      <div className="hero-section px-20">
        <img
          className="px-10 max-w-screen"
          src="https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/w_1349,c_limit/5b67cda3-a72e-4059-8656-1d102813f808/nike-just-do-it.jpg"
          alt=""
        />

        <div
          className="items-center mx-60 p-2 lg:px-8 text-center mt-4"
          aria-label="Global"
        >
          <p className="text-lg">Nike Training</p>

          <p className="text-7xl font-nike">
            MADE FOR YOUR <br></br>EVERY MOVE
          </p>
          <p className="mt-4">
            No matter what your workout looks like today or tomorrow, we’ve got{" "}
            <br></br>
            the go-to essentials to make every movement count.
          </p>
          <button className="bg-black text-white rounded-2xl px-4 py-1 mt-4">
            Shop
          </button>
        </div>
      </div>

      {/* products */}
      <div className="">
        <div className="mx-20 px-4 sm:px-6 lg:px-8">
          <div className=" max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
            <h2 className="text-xl text-gray-900">Retro running</h2>

            <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
              {callouts.slice(0, 3).map((callout) => (
                <div key={callout.name} className="group relative">
                  <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75">
                    <img
                      src={callout.imageSrc}
                      alt={callout.imageAlt}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <h3 className="mt-6 text-regular font-medium text-gray-900 flex items-center justify-between">
                    <span>{callout.name}</span>
                    <span className="text-black pr-4">
                      {" "}
                      {callout.price.toLocaleString()},000₫
                    </span>
                  </h3>
                  <p className="text-gray-500">{callout.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Hero section 2 */}
      <div className=" px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
          <h2 className="text-xl text-gray-900">The Lastest</h2>
          <div className="flex items-center max-w-screen mt-4">
            {" "}
            <img
              className="w-6/12 h-auto mr-4"
              src="https://static.nike.com/a/images/f_auto/dpr_1.3,cs_srgb/w_906,c_limit/c6981bb7-63a5-46c0-818f-32feb3d1a311/nike-just-do-it.png"
              alt=""
            />
            <img
              className="w-6/12 h-auto"
              src="https://static.nike.com/a/images/f_auto/dpr_1.3,cs_srgb/w_906,c_limit/8ac5e8ef-7d26-4053-9a76-23c219cbf85d/nike-just-do-it.png"
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="px-4 sm:px-6 lg:px-8 my-12">
        <h2 className="text-xl text-gray-900 my-4">Trending Now</h2>
        <Swiper
          // install Swiper modules
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={50}
          slidesPerView={3}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
        >
          {slider.map((callout) => (
            <SwiperSlide>
              <div key={callout.name} className="group relative mb-10">
                <div className="relative h-full w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 ">
                  <img
                    src={callout.imageSrc}
                    alt={callout.imageAlt}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <h3 className="mt-6 text-regular font-medium text-gray-900 flex items-center justify-between">
                  <span>{callout.name}</span>
                  <span className="text-black pr-4">
                    {" "}
                    {callout.price.toLocaleString()},000₫
                  </span>
                </h3>
                <p className=" text-gray-500">{callout.description}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="hero-section px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl text-gray-900 mt-40">Just in</h2>
        <img
          className="max-w-screen mt-6"
          src="https://static.nike.com/a/images/f_auto/dpr_1.3,cs_srgb/w_1824,c_limit/b165c418-4f83-4cd2-82b7-91a9c4251a6c/nike-just-do-it.jpg"
          alt=""
        />

        <div
          className="items-center mx-60 p-2 lg:px-8 text-center mt-4"
          aria-label="Global"
        >
          <p className="text-7xl font-nike">
            CHECK THE<br></br> FOOTWORK IN <br></br>THE ZOOM FREAK 5<br></br>{" "}
            &apos;MADE IN SEPOLIA&apos;
          </p>
          <p className="mt-4">
            Lively street art and global football roots inspire Giannis’ latest
            colourway.
          </p>
          <button className="bg-black text-white rounded-2xl px-4 py-1 mt-4">
            Shop
          </button>
        </div>
      </div>
      {/* products */}
      <div className="">
        <div className=" px-4 sm:px-6 lg:px-8">
          <div className=" py-16 sm:py-24 lg:max-w-none lg:py-32">
            <h2 className="text-xl text-gray-900">Retro running</h2>

            <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
              {callouts.slice(3, 6).map((callout) => (
                <div key={callout.name} className="group relative">
                  <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75">
                    <img
                      src={callout.imageSrc}
                      alt={callout.imageAlt}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <h3 className="mt-6 font-medium text-gray-900 flex items-center justify-between">
                    <span>{callout.name}</span>
                    <span className="text-black pr-4">
                      {" "}
                      {callout.price.toLocaleString()},000₫
                    </span>
                  </h3>
                  <p className=" text-gray-500">{callout.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Nav items */}
      <div aria-labelledby="footer-heading">
        <div className="mx-auto max-w-7xl px-6 pb-8 pt-6 sm:pt-14 lg:px-8 lg:pt-20">
          <div className="xl:grid xl:grid-cols-2 xl:gap-8">
            <div className="mt-16 grid grid-cols-4 gap-8 xl:col-span-2 xl:mt-0">
              <div className="md:grid md:grid-cols-1">
                <div>
                  <h3 className="text-lg font-semibold leading-6 ">Icons</h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {navigation.icons.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className="text-regular leading-6 text-gray-500 hover:text-black"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="md:grid md:grid-cols-1">
                <div>
                  <h3 className="text-lg font-semibold leading-6 ">Shoes</h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {navigation.shoes.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className="text-regular leading-6 text-gray-500 hover:text-black"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="md:grid md:grid-cols-1 md:gap-8">
                <div>
                  <h3 className="text-lg font-semibold leading-6 ">Clothing</h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {navigation.clothing.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className="text-regular leading-6 text-gray-500 hover:text-black"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="md:grid md:grid-cols-1 md:gap-8">
                <div>
                  <h3 className="text-lg font-semibold leading-6 ">Kids</h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {navigation.kids.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className="text-regular leading-6 text-gray-500 hover:text-black"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
