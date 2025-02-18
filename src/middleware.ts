import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // If accessing root, redirect to page 1
  if (pathname === '/') {
    return NextResponse.rewrite(new URL('/1', request.url))
  }
}

export const config = {
  matcher: '/',
} 