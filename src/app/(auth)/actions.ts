'use server'

import { redirect } from 'next/navigation'
import { createClientServer } from '@/lib/supabase/server'

// Definisikan tipe untuk state yang akan dikembalikan
interface ActionResult {
  error: string | null;
}

// Fungsi signin yang sudah diperbaiki
export async function signin(prevState: ActionResult, formData: FormData): Promise<ActionResult> {
  const supabase = await createClientServer()

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  // 1. Validasi Input Sederhana di Server
  if (!email || !password) {
    return { error: 'Email and password are required.' };
  }

  // 2. Proses Sign In
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  // 3. Kembalikan error jika ada, agar bisa ditampilkan di UI
  if (error) {
    console.log("❌ Sign In Error", error.message);
    return { error: error.message };
  }

  console.log("✅ Sign In Success");
  // Redirect hanya jika berhasil. RevalidatePath tidak terlalu dibutuhkan di sini
  // karena middleware akan menangani sesi.
  redirect('/roadmaps');
  
  // Return ini tidak akan pernah tercapai karena redirect, tapi dibutuhkan untuk tipe TypeScript
  return { error: null };
}

// Fungsi signup yang sudah diperbaiki
export async function signup(prevState: ActionResult, formData: FormData): Promise<ActionResult> {
  const supabase = await createClientServer();

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  // 1. Validasi Input Sederhana
  if (!email || !password) {
    return { error: 'Email and password are required.' };
  }
  if (password.length < 6) {
      return { error: 'Password must be at least 6 characters long.' };
  }

  // 2. Proses Sign Up
  const { error } = await supabase.auth.signUp({ email, password });

  // 3. Kembalikan error jika ada
  if (error) {
    console.log("❌ Sign Up Error", error.message);
    return { error: error.message };
  }
  
  // 4. Redirect ke halaman signin dengan pesan sukses (opsional, bisa pakai query param)
  // Untuk sekarang, kita redirect saja agar user bisa login.
  console.log("✅ Sign Up Success, please check your email to verify.");
  redirect('/signin?message=Check your email to verify your account');

  return { error: null };
}

export async function signOut() {
  const supabase = await createClientServer()
  await supabase.auth.signOut()
  // Arahkan pengguna kembali ke halaman login setelah logout
  redirect('/signin')
}
