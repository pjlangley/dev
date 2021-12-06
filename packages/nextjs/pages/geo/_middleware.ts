import { NextResponse, NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const res = NextResponse.next()
  res.headers.set('x-pjlangley-country', req.geo.country || '')
  res.headers.set('x-pjlangley-city', req.geo.city || '')

  return res;
}
