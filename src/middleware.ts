import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import metadata from './slides/metadata.json'
import type { DeckMetadata } from './types/slides'

const slideMapping = metadata as DeckMetadata;

// Convert order object to array for easier indexing
const slideOrder = Object.entries(slideMapping.order)
  .sort((a, b) => a[1] - b[1])
  .map(([id]) => id);

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
    if (pageNumber < 1 || pageNumber > slideOrder.length) {
      return NextResponse.redirect(new URL('/404', request.url))
    }
    const id = slideOrder[pageNumber - 1]
    
    // Preserve the thumbnail parameter if present
    const url = new URL(`/slides/${id}`, request.url)
    const isThumbnail = request.nextUrl.searchParams.get('thumbnail') === 'true'
    if (isThumbnail) {
      url.searchParams.set('thumbnail', 'true')
    }
    
    return NextResponse.rewrite(url)
  }

  // Handle /by-id/[id] routes
  const idMatch = pathname.match(/^\/by-id\/([a-z0-9-]+)$/)
  if (idMatch) {
    const id = idMatch[1]
    if (!(id in slideMapping.order)) {
      return NextResponse.redirect(new URL('/404', request.url))
    }
    
    // Preserve the thumbnail parameter if present
    const url = new URL(`/slides/${id}`, request.url)
    const isThumbnail = request.nextUrl.searchParams.get('thumbnail') === 'true'
    if (isThumbnail) {
      url.searchParams.set('thumbnail', 'true')
    }
    
    return NextResponse.rewrite(url)
  }
}

export const config = {
  matcher: [
    '/',
    '/by-index/:path*',
    '/by-id/:path*'
  ],
  // NOTE: workaround for https://github.com/denoland/deno/issues/28246, disabled in favor of bun
  // runtime: "nodejs",
}
