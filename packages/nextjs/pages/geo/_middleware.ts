import { NextResponse, NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const res = NextResponse.next()

  console.log('x-pjlangley-country', req.geo.country)
  console.log('x-pjlangley-city', req.geo.city)

  res.headers.set('x-pjlangley-country', req.geo.country || '')
  res.headers.set('x-pjlangley-city', req.geo.city || '')

  return res;
}
