'use server';

import { createClientServer } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// ✅ PERBAIKAN 2: Tambahkan 'export' agar bisa diimpor di file lain
export interface ActionResult {
  error: string | null;
}

export async function signup(
  prevState: ActionResult, 
  formData: FormData
): Promise<ActionResult> {
  // ✅ PERBAIKAN 1: Tambahkan 'await' di sini
  const supabase = await createClientServer();

  // Ambil data dari form
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;

  // Validasi Input
  if (!email || !password || !confirmPassword) {
    return { error: 'Semua field wajib diisi.' };
  }
  if (password !== confirmPassword) {
    return { error: 'Password dan konfirmasi password tidak cocok.' };
  }
  if (password.length < 6) {
    return { error: 'Password harus memiliki minimal 6 karakter.' };
  }

  // Lakukan proses signup ke Supabase
  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  // Tangani error dari Supabase
  if (error) {
    console.error('Supabase signup error:', error.message);
    if (error.message.includes('User already registered')) {
        return { error: 'Pengguna dengan email ini sudah terdaftar.' };
    }
    return { error: 'Gagal membuat akun. Silakan coba lagi.' };
  }

  // Jika berhasil, revalidasi dan redirect
  revalidatePath('/', 'layout');
  redirect('/confirm-email');
}