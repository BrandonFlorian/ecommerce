import { HTTP_STATUS_CODES } from "@/utils/constants";
import { createClient } from "@/utils/supabase/server";
import type { SupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  if (request.method !== "GET") {
    console.error("Request method is not GET");

    return NextResponse.json(
      { message: "Request method is not GET" },
      { status: HTTP_STATUS_CODES.METHOD_NOT_ALLOWED }
    );
  }
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  if (!supabase) {
    return NextResponse.json(
      { message: "Server Error" },
      { status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR }
    );
  }

  const { searchParams } = new URL(request.url);
  const profileId = searchParams.get("id");
  const username = searchParams.get("username");

  console.log("data", { profileId, username });
  // If a profile ID is provided, fetch the single profile
  if (profileId) {
    return await getProfileById(request, profileId, supabase);
  }
}

async function getProfileById(
  request: NextRequest,
  id: string,
  supabase: SupabaseClient
) {
  try {
    if (!supabase) {
      return NextResponse.json(
        { message: "Server Error" },
        { status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR }
      );
    }
    //fetch product by id
    const { data: product, error } = await supabase
      .from("product")
      .select()
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching product:", error);
      return NextResponse.json(
        { message: "Error fetching product" },
        { status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR }
      );
    }
    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: HTTP_STATUS_CODES.NOT_FOUND }
      );
    }

    return NextResponse.json(product, { status: HTTP_STATUS_CODES.OK });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { message: "Error fetching product" },
      { status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR }
    );
  }
}

export async function PUT(request: NextRequest) {
  if (request.method !== "GET") {
    console.error("Request method is not GET");

    return NextResponse.json(
      { message: "Request method is not GET" },
      { status: HTTP_STATUS_CODES.METHOD_NOT_ALLOWED }
    );
  }
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  if (!supabase) {
    return NextResponse.json(
      { message: "Server Error" },
      { status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR }
    );
  }

  const { searchParams } = new URL(request.url);
  const profileId = searchParams.get("id");
  const username = searchParams.get("username");

  console.log("data", { profileId, username });

  if (profileId) {
    return await updateProfile(request, profileId, username, supabase);
  }
}
async function updateProfile(
  request: NextRequest,
  id: string,
  payload: any,
  supabase?: SupabaseClient
) {
  try {
    if (!supabase) {
      return NextResponse.json(
        { message: "Server Error" },
        { status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR }
      );
    }

    const { data: profile, error } = await supabase
      .from("profile")
      .update(payload)
      .eq("id", id);

    if (error) {
      console.error("Error fetching products:", error);
      return NextResponse.json(
        { message: "Error fetching products" },
        { status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR }
      );
    }

    if (!profile) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: HTTP_STATUS_CODES.NOT_FOUND }
      );
    }

    return NextResponse.json(profile, { status: HTTP_STATUS_CODES.OK });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { message: "Error fetching products" },
      { status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR }
    );
  }
}
