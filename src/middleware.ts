import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import mapping from './slides/mapping.json'
import type { SlideMapping } from './types/slides'

const slideMapping = mapping as SlideMapping;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // If accessing root, redirect to first slide by index
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/by-index/1', request.url))
  }

  // Handle /by-index/[number] routes
  const indexMatch = pathname.match(/^\/by-index\/(\d+)$/)
  if (indexMatch) {
    const pageNumber = parseInt(indexMatch[1])
    if (pageNumber < 1 || pageNumber > slideMapping.order.length) {
      return NextResponse.redirect(new URL('/404', request.url))
    }
    const id = slideMapping.order[pageNumber - 1]
    return NextResponse.rewrite(new URL(`/slides/${id}`, request.url))
  }

  // Handle /by-id/[id] routes
  const idMatch = pathname.match(/^\/by-id\/([0-9a-f-]+)$/)
  if (idMatch) {
    const id = idMatch[1]
    if (!slideMapping.slides[id]) {
      return NextResponse.redirect(new URL('/404', request.url))
    }
    return NextResponse.rewrite(new URL(`/slides/${id}`, request.url))
  }
}

export const config = {
  matcher: [
    '/',
    '/by-index/:path*',
    '/by-id/:path*'
  ]
}
