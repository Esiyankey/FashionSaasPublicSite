import { revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

const TAGS = new Set(["products", "categories", "content", "settings", "blog", "outfit-finder"]);

export async function POST(request: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
  }

  if (!payload || typeof payload !== "object") {
    return NextResponse.json({ message: "Invalid revalidation request" }, { status: 422 });
  }
  const { organizationSlug, tags } = payload as { organizationSlug?: unknown; tags?: unknown };
  const expectedSlug = process.env.NEXT_PUBLIC_STORE_SLUG;
  if (!expectedSlug || organizationSlug !== expectedSlug) {
    return NextResponse.json({ message: "Store does not match this deployment" }, { status: 404 });
  }
  if (!Array.isArray(tags) || tags.length > 50 || !tags.every((tag) => typeof tag === "string" && tag.length <= 200)) {
    return NextResponse.json({ message: "Invalid cache tags" }, { status: 422 });
  }

  const validTags = tags.filter((tag: string) =>
    TAGS.has(tag) || /^product:[a-z0-9-]{1,160}$/.test(tag) || /^blog:[a-z0-9-]{1,160}$/.test(tag),
  );
  for (const tag of new Set(validTags)) revalidateTag(tag, "max");
  return NextResponse.json({ revalidated: [...new Set(validTags)] });
}
