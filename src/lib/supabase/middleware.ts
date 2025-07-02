import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

const authRoutes = ["/signin", "/signup"]

export async function updateSessionAndGuardRoutes(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const pathname = request.nextUrl.pathname
  const isProtectedRoutes = pathname.startsWith('/u') 
  const isAuthRoutes = authRoutes.includes(pathname)
  // refreshing the auth token
  const session = await supabase.auth.getUser()

  // ✅ Redirect unauthenticated users *away* from protected routes
  if (isProtectedRoutes && session.error) {
    console.log("🔐 Not authenticated, redirecting to /signin")
    return NextResponse.redirect(new URL('/signin', request.url))
  }

  // ✅ Redirect authenticated users *away* from /signin or /signup
  if (isAuthRoutes && !session.error) {
    console.log("🔄 Already logged in, redirecting to /u")
    return NextResponse.redirect(new URL('/u', request.url))
  }

  return supabaseResponse
}