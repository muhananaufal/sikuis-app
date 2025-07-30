"use client";

import { useActionState } from "react";
// import Image from "next/image";
import Link from "next/link"; // Gunakan Link untuk navigasi internal
import { signin } from "../actions";

// Definisikan initial state untuk useActionState
const initialState = {
  error: null,
};

export default function SignIn() {
  // Gunakan useActionState untuk menghubungkan UI dengan Server Action
  const [state, formAction, isPending] = useActionState(signin, initialState);

  return (
    // Gunakan `action` prop pada form, bukan `formAction` pada button
    <form action={formAction} className="max-w-xl mx-auto mt-10 p-6">
      <h2 className="text-4xl mb-12 font-semibold text-brand text-center">
        Sign In
      </h2>

      {/* Tampilkan error dari server action */}
      {state?.error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-5"
          role="alert"
        >
          <span className="block sm:inline">{state.error}</span>
        </div>
      )}

      {/* FORM INPUT (Tidak perlu state lagi) */}
      <input
        id="email"
        type="email"
        name="email"
        placeholder="Email"
        required
        className="w-full border-3 border-text-secondary px-4 py-4 text-text-primary focus:outline-none rounded-t-xl"
      />
      <div className="relative">
        <input
          id="password"
          type="password" // Kita bisa sederhanakan tanpa show/hide dulu
          name="password"
          placeholder="Password"
          required
          className="w-full border-3 border-text-secondary px-4 py-4 text-text-primary focus:outline-none rounded-b-xl border-t-0 -mt-px"
        />
      </div>
      {/* <div className="mt-6 text-color-brand font-semibold">
				<a href="#">FORGOT PASSWORD</a>
			</div> */}

      {/* SIGN IN BUTTON */}
      <button
        type="submit"
        disabled={isPending} // Nonaktifkan tombol saat form sedang diproses
        className="w-full bg-color-brand text-text-negative mt-6 p-4 font-semibold rounded-xl hover:brightness-90 transition cursor-pointer disabled:bg-gray-400"
      >
        {isPending ? "Signing In..." : "SIGN IN"}
      </button>

      <div className="mt-6 text-color-brand font-semibold text-center">
        {/* Gunakan <Link> untuk performa lebih baik (menghindari full page reload) */}
        <Link href="/signup">DON&apos;T HAVE AN ACCOUNT?</Link>
      </div>

      {/* <div className="mt-4 text-text-secondary font-semibold text-center">
        OR
      </div> */}

      {/* BUG FIX: Tombol Google harusnya memicu flow OAuth, bukan submit form ini */}
      {/* <button
        type="button" // Ubah ke "button" agar tidak submit form utama
        // onClick={handleGoogleSignIn} // Anda perlu membuat fungsi ini
        className="relative w-full bg-transparent border-3 text-color-brand mt-6 p-4 font-semibold rounded-xl hover:bg-color-brand hover:text-text-negative transition cursor-pointer flex justify-center items-center"
      >
        <Image
          src="/google.svg"
          alt="Google"
          width={24}
          height={24}
          className="absolute left-5 object-contain"
        />
        Sign In with Google
      </button> */}

      {/* ... sisa kode ... */}
    </form>
  );
}
