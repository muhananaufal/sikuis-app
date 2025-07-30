'use client';

import { useState } from 'react';
// import Image from 'next/image';
import { useActionState } from 'react';
import { signup, ActionResult } from './actions';

const initialState: ActionResult = {
	error: null,
};

export default function SignUp() {
	const [state, formAction, isPending] = useActionState(signup, initialState);
	const [showPassword, setShowPassword] = useState(false);

	return (
		<form action={formAction} className="max-w-xl mx-auto mt-10 p-6">
			<h2 className="text-4xl mb-12 font-semibold text-color-brand text-center">Create A New Account</h2>

			{/* Tampilkan error dari `state` yang dikelola oleh hook */}
			{state.error && (
				<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-5" role="alert">
					<span className="block sm:inline">{state.error}</span>
				</div>
			)}

			{/* Input form */}
			<input type="email" name="email" placeholder="Email" required className="w-full border-3 border-text-secondary px-4 py-4 text-text-primary focus:outline-none rounded-t-xl" />
			<div className="relative">
				<input type={showPassword ? 'text' : 'password'} name="password" placeholder="Password" required className="w-full border-3 border-text-secondary px-4 py-4 text-text-primary focus:outline-none border-t-0 -mt-px" />
				<button type="button" onClick={() => setShowPassword((prev) => !prev)} className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary">
					<span className="material-icons-outlined text-color-brand" style={{ fontSize: '1.8rem' }}>
						{showPassword ? 'visibility_off' : 'visibility'}
					</span>
				</button>
			</div>
			<div className="relative">
				<input
					type={showPassword ? 'text' : 'password'}
					name="confirmPassword"
					placeholder="Confirm password"
					required
					className="w-full border-3 border-text-secondary px-4 py-4 text-text-primary focus:outline-none rounded-b-xl border-t-0 -mt-px"
				/>
				<button type="button" onClick={() => setShowPassword((prev) => !prev)} className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary">
					<span className="material-icons-outlined text-color-brand" style={{ fontSize: '1.8rem' }}>
						{showPassword ? 'visibility_off' : 'visibility'}
					</span>
				</button>
			</div>

			{/* Tombol Sign Up */}
			<button type="submit" className="w-full bg-color-brand text-text-negative mt-6 p-4 font-semibold rounded-xl hover:brightness-90 transition cursor-pointer disabled:opacity-50" disabled={isPending}>
				{isPending ? 'Signing Up...' : 'SIGN UP'}
			</button>

			{/* Link ke Sign In */}
			<div className="mt-6 text-color-brand font-semibold text-center">
				<a href="/signin">ALREADY HAVE AN ACCOUNT?</a>
			</div>

			{/* <div className="mt-4 text-text-secondary font-semibold text-center">OR</div> */}

			{/* Tombol Sign Up with Google */}
			{/* <button
				type="button" // Ganti ke "button" agar tidak men-submit form utama
				// onClick={handleGoogleSignUp} // Anda akan butuh fungsi terpisah untuk ini
				className="relative w-full bg-transparent border-3 text-color-brand mt-6 p-4 font-semibold rounded-xl hover:bg-color-brand hover:text-text-negative transition cursor-pointer flex justify-center items-center"
			>
				<Image src="/google.svg" alt="Google" width={24} height={24} className="absolute left-5 object-contain" />
				Sign Up with Google
			</button> */}

			{/* Terms and Policy */}
			<div className="mt-4 p-4 text-text-secondary font-regular text-center">
				By signing up to SiKuis, you agree to our{' '}
				<a href="#">
					<b>Terms</b>
				</a>{' '}
				and
				<a href="#">
					<b>Privacy Policy</b>
				</a>
			</div>
		</form>
	);
}
