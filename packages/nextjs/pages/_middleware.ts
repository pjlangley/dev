import { NextResponse } from 'next/server'

export function middleware() {
  const res = NextResponse.next()
  res.headers.set('x-pjlangley', '1')

  return res;
}
