"use client";

import { useState } from "react";
import Image from "next/image";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Login with:`, { email, password });
    // Here you'd call your API
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto mt-10 p-6">
      <h2 className="text-4xl mb-12 font-semibold text-[var(--text-brand)] text-center">
        Sign In
      </h2>

      {/* FORM INPUT */}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full border-3 border-[var(--text-secondary)] px-4 py-4 text-[var(--text-primary)] focus:outline-none rounded-t-xl"
      />
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border-3 border-[var(--text-secondary)] px-4 py-4 text-[var(--text-primary)] focus:outline-none rounded-b-xl border-t-0 -mt-px"
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text[var(--text-secondary)]"
        >
          <span
            className="material-icons-outlined text-[var(--text-brand)]"
            style={{ fontSize: "1.8rem" }}
          >
            {showPassword ? "visibility_off" : "visibility"}
          </span>
        </button>
      </div>
      <div className="mt-6 text-[var(--text-brand)] font-semibold">
        <a href="">FORGOT PASSWORD</a>
      </div>

      {/* SIGN IN/SIGN UP BUTTON */}
      <button
        type="submit"
        className="w-full bg-[var(--text-brand)] text-[var(--text-white)] mt-6 p-4 font-semibold rounded-xl hover:brightness-90 transition cursor-pointer"
      >
        SIGN IN
      </button>
      <div className="mt-6 text-[var(--text-brand)] font-semibold text-center">
        <a href="/signup">DON&apos;T HAVE ACCOUNT?</a>
      </div>

      <div className="mt-4 text-[var(--text-secondary)] font-semibold text-center">
        OR
      </div>

      {/* OTHER SIGN IN/SIGN UP METHOD */}
      <button
        type="submit"
        className="relative w-full bg-transparent border-3 text-[var(--text-brand)] mt-6 p-4 font-semibold rounded-xl hover:bg-[var(--text-brand)] hover:text-[var(--text-white)] transition cursor-pointer flex justify-center items-center"
      >
        <Image
          src="/google.svg"
          alt="Google"
          width={24}
          height={24}
          className="absolute left-5 object-contain"
        />
        Sign In with Google
      </button>

      <div className="mt-4 p-4 text-[var(--text-secondary)] font-regular text-center">
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
