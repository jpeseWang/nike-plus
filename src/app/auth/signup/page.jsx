"use client";
import nike from "@/assets/images/nike.svg.png";
import Image from "next/image";
import { CountrySelector } from "@/utils/option";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { RadioGroup } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { classNames } from "@/utils/classNames";
const mailingLists = [
  {
    id: 1,
    title: "Male",
  },
  {
    id: 2,
    title: "Female",
  },
];

const Signup = () => {
  const [selectedMailingLists, setSelectedMailingLists] = useState(
    mailingLists[0]
  );
  const [inputType, setInputType] = useState("");
  const [err, setErr] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target[2].value;
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      toast.success("Create account successfully!");
      res.status = 201 && router.push("/auth/login");
    } catch (err) {
      setErr(true);
    }
  };
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image className="mx-auto h-4 w-auto" src={nike} alt="Your Company" />
          <h2 className="mt-10 text-center text-2xl font-extrabold leading-9 tracking-tight text-gray-900 font-gothic">
            BECOME A NIKE MEMBER
          </h2>
          <p className="mt-6 text-center font-light text-sm text-gray-500 px-4">
            Create your Nike Member profile and get first access to the very
            best of Nike products, inspiration and community.
          </p>
          <form className="space-y-4 items-center" onSubmit={handleSubmit}>
            <div className="my-2 w-9/12 mx-auto">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Email address"
                required
                className="items-center block w-full rounded border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 my-4"
              />{" "}
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="Password"
                required
                className="block w-full rounded border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 my-4"
              />
              <input
                type="text"
                autoComplete="current-password"
                placeholder="First Name"
                required
                className="block w-full rounded border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 my-4"
              />
              <input
                type="text"
                autoComplete="current-password"
                placeholder="Last Name"
                required
                className="block w-full rounded border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 my-4"
              />
              <input
                type={inputType}
                onFocus={() => setInputType("date")}
                onBlur={() => setInputType("text")}
                autoComplete="current-password"
                placeholder="Date of Birth"
                required
                className="block w-full rounded border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 my-4"
              />
              <p className=" font-light text-xs text-gray-500 px-2 -mt-2">
                Get a Nike Member Reward every year on your Birthday.
              </p>
              <CountrySelector />
              <div className="mb-4">
                <RadioGroup
                  value={selectedMailingLists}
                  onChange={setSelectedMailingLists}
                >
                  <div className="w-full grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                    {mailingLists.map((mailingList) => (
                      <RadioGroup.Option
                        key={mailingList.id}
                        value={mailingList}
                        className={({ active }) =>
                          classNames(
                            active
                              ? "border-gray-600 ring-1 ring-gray-600"
                              : "border-gray-300",
                            "relative flex cursor-pointer rounded border bg-white py-1.5 px-4 shadow-sm focus:outline-none"
                          )
                        }
                      >
                        {({ checked, active }) => (
                          <>
                            <span className="flex flex-1"></span>
                            <CheckCircleIcon
                              className={classNames(
                                !checked ? "invisible" : "",
                                "h-5 w-5 text-gray-600"
                              )}
                              aria-hidden="true"
                            />
                            <span className="flex">
                              <RadioGroup.Label
                                as="span"
                                className="block text-sm font-medium text-gray-800 pr-6"
                              >
                                {mailingList.title}
                              </RadioGroup.Label>
                            </span>
                            <span
                              className={classNames(
                                active ? "border" : "border-1",
                                checked
                                  ? "border-gray-600"
                                  : "border-transparent",
                                "pointer-events-none absolute -inset-px rounded"
                              )}
                              aria-hidden="true"
                            />
                          </>
                        )}
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div>
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-10 w-10 rounded border-gray-200 text-indigo-600 focus:ring-indigo-600"
                />
                <label
                  htmlFor="remember-me"
                  className="text-xs leading-6 text-gray-500 font-light mx-2"
                >
                  Sign up for emails to get updates from Nike on products,
                  offers and Member benefits
                </label>
              </div>
            </div>
            <div>
              <div className="">
                <p className="text-center font-light text-sm text-gray-500 py-3 px-4">
                  By creating an account, you agree to Nike&apos;s{" "}
                  <span className="underline">Privacy Policy</span> and
                  <span className="underline"> Terms of Use</span>.
                </p>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-sm bg-black px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                JOIN US
              </button>
            </div>
          </form>
          {err && "Something went wrong!"}

          <p className="mt-10 text-center text-sm text-gray-500">
            Already a member?{" "}
            <a href="/auth/login" className=" leading-6 text-black underline">
              Sign in.
            </a>
          </p>
        </div>
      </div>
    </>
  );
};
export default Signup;
