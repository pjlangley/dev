import { NextResponse, NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  console.log("req.geo.country", req.geo.country);
  console.log("req.geo.city", req.geo.city);

  req.nextUrl.searchParams.set("country", req.geo.country || "");
  req.nextUrl.searchParams.set("city", req.geo.city || "");

  return NextResponse.rewrite(req.nextUrl);
}
