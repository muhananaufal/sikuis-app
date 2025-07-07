'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClientServer } from '@/lib/supabase/server'
import { showToast } from '@/lib/Toast'

export async function signin(formData: FormData) {
  const supabase = await createClientServer()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    console.log("❌ Sign In Error", error)
    return
  }

  console.log("✅ Sign In Success")
  revalidatePath('/', 'layout')
  redirect('/u/roadmaps')
}

export async function signup(formData: FormData) {
  const supabase = await createClientServer()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    console.log("❌ Sign Up Error", error)
    return
  }

  console.log("✅ Sign Up Success")
  revalidatePath('/', 'layout')
  redirect('/signin')
}