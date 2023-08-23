"use client";
import nike from "@/assets/images/nike.svg.png";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import LoadingComponent from "@/app/loading";
const Login = () => {
  const router = useRouter();
  const session = useSession();
  const params = useSearchParams();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  useEffect(() => {
    setError(params.get("error"));
    setSuccess(params.get("success"));
  }, [params]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    signIn("credentials", { email, password });
  };

  if (session.status === "loading") {
    return <LoadingComponent />;
  }
  if (session.status === "authenticated") {
    router?.push("/auth/dashboard");
  }
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image className="mx-auto h-4 w-auto" src={nike} alt="Your Company" />
          <h2 className="mt-10 text-center text-2xl font-extrabold leading-9 tracking-tight text-gray-900 font-gothic">
            YOUR ACCOUNT FOR <br></br>EVERYTHING NIKE
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Email address"
                  required
                  className="block w-full rounded border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Password"
                  required
                  className="block w-full rounded border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <div className="flex items-center justify-between py-4">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-3 block text-sm leading-6 text-gray-600 font-light"
                    >
                      Keep me signed in
                    </label>
                  </div>

                  <div className="text-sm leading-6">
                    <a
                      href="#"
                      className="font-light text-gray-400 hover:text-black"
                    >
                      Forgotten your password?
                    </a>
                  </div>
                </div>
                <p className="text-center font-light text-sm text-gray-500 py-3 px-4">
                  By logging in, you agree to Nike&apos;s{" "}
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
                SIGN IN
              </button>
              <p className="my-2 text-red-500 font-medium"> {error && error}</p>
            </div>
          </form>
          <div className="mt-10">
            <div className="relative">
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm font-medium leading-6">
                <span className="bg-white px-6 text-gray-900">OR</span>
              </div>
            </div>

            <div className="mt-6 gap-4">
              <div
                className="cursor-pointer flex w-full items-center justify-center gap-3 rounded-md  px-3 py-1.5 text-gray-600  hover:bg-gray-100 focus-visible:outline ring-2 ring-gray-300"
                onClick={() => {
                  signIn("google");
                }}
              >
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 488 512"
                  fill="currentColor"
                >
                  <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
                </svg> */}
                <img
                  className="h-6 w-6"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1176px-Google_%22G%22_Logo.svg.png?20230305195327"
                />
                <span className="text-sm font-semibold leading-6">
                  Continue with Google
                </span>
              </div>
            </div>
          </div>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <button
              onClick={() => router.push("/auth/signup")}
              className=" leading-6 text-black underline"
            >
              Join Us
            </button>
          </p>
        </div>
      </div>
    </>
  );
};
export default Login;
