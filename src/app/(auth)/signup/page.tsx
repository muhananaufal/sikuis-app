"use client";

import { useState } from "react";
import Image from "next/image";
import { signup } from "../actions";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  return (
    <form className="max-w-xl mx-auto mt-10 p-6">
      <h2 className="text-4xl mb-12 font-semibold text-color-brand text-center">
        Create A New Account
      </h2>

      {/* Alerts */}
      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-5"
          role="alert"
        >
          <span className="block sm:inline">{error}</span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg
              className="fill-current h-6 w-6 text-red-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
          </span>
        </div>
      )}

      {/* FORM INPUT */}
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full border-3 border-text-secondary px-4 py-4 text-text-primary focus:outline-none rounded-t-xl"
      />
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border-3 border-text-secondary px-4 py-4 text-text-primary focus:outline-none border-t-0 -mt-px"
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-4 top-1/2 -translate-y-1/2 texttext-secondary"
        >
          <span
            className="material-icons-outlined text-color-brand"
            style={{ fontSize: "1.8rem" }}
          >
            {showPassword ? "visibility_off" : "visibility"}
          </span>
        </button>
      </div>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full border-3 border-text-secondary px-4 py-4 text-text-primary focus:outline-none rounded-b-xl border-t-0 -mt-px"
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-4 top-1/2 -translate-y-1/2 texttext-secondary"
        >
          <span
            className="material-icons-outlined text-color-brand"
            style={{ fontSize: "1.8rem" }}
          >
            {showPassword ? "visibility_off" : "visibility"}
          </span>
        </button>
      </div>

      {/* SIGN IN/SIGN UP BUTTON */}
      <button
        formAction={signup}
        className="w-full bg-color-brand text-text-negative mt-6 p-4 font-semibold rounded-xl hover:brightness-90 transition cursor-pointer"
      >
        SIGN UP
      </button>
      <div className="mt-6 text-color-brand font-semibold text-center">
        <a href="/signin">ALREADY HAVE AN ACCOUNT?</a>
      </div>

      <div className="mt-4 text-text-secondary font-semibold text-center">
        OR
      </div>

      {/* OTHER SIGN IN/SIGN UP METHOD */}
      <button
        type="submit"
        className="relative w-full bg-transparent border-3 text-color-brand mt-6 p-4 font-semibold rounded-xl hover:bg-color-brand hover:text-text-negative transition cursor-pointer flex justify-center items-center"
      >
        <Image
          src="/google.svg"
          alt="Google"
          width={24}
          height={24}
          className="absolute left-5 object-contain"
        />
        Sign Up with Google
      </button>

      <div className="mt-4 p-4 text-text-secondary font-regular text-center">
        By signing up to SiKuis, you agree to our{" "}
        <a href="">
          <b>Terms</b>
        </a>{" "}
        and
        <a href="">
          {" "}
          <b>Privacy Policy</b>
        </a>
      </div>
    </form>
  );
}
