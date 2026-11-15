import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";

function tokensMatch(provided: string, secret: string): boolean {
  const left = Buffer.from(provided);
  const right = Buffer.from(secret);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

/** Refuse catalog create, update, delete, and image changes. */
export function catalogWriteDenied(request: Request): NextResponse | null {
  const secret = process.env.CATALOG_PASSWORD?.trim();
  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      return NextResponse.json({ error: "Catalog editing is disabled" }, { status: 403 });
    }
    return null;
  }
  const header = request.headers.get("authorization") ?? "";
  if (!tokensMatch(header, `Bearer ${secret}`)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}
