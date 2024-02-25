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
      { message: "Server Error with supabase client" },
      { status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR }
    );
  }

  const { searchParams } = new URL(request.url);
  const profileId = searchParams.get("id");
  const username = searchParams.get("username");

  // If a username is provided, fetch the single profile
  if (username) {
    return await getProfileByUsername(username, supabase);
  }

  // If a profile ID is provided, fetch the single profile
  if (profileId) {
    return await getProfileById(profileId, supabase);
  }

  return NextResponse.json(
    { message: "No username or profile ID provided" },
    { status: HTTP_STATUS_CODES.BAD_REQUEST }
  );
}

async function getProfileById(id: string, supabase: SupabaseClient) {
  try {
    if (!supabase) {
      return NextResponse.json(
        { message: "Server Error" },
        { status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR }
      );
    }
    //fetch product by id
    const { data: profile, error } = await supabase
      .from("user_profile")
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
    if (!profile) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: HTTP_STATUS_CODES.NOT_FOUND }
      );
    }

    return NextResponse.json(profile, { status: HTTP_STATUS_CODES.OK });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { message: "Error fetching product" },
      { status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR }
    );
  }
}

async function getProfileByUsername(
  username: string,
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
    const { data: profile, error } = await supabase
      .from("user_profile")
      .select()
      .eq("username", username)
      .single();

    if (error) {
      console.error("Error fetching product:", error);
      return NextResponse.json(
        { message: "Error fetching product" },
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
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { message: "Error fetching product" },
      { status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR }
    );
  }
}

export async function PUT(request: NextRequest) {
  if (request.method !== "PUT") {
    console.error("Request method is not PUT");

    return NextResponse.json(
      { message: "Request method is not PUT" },
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

  // Get the info from the body
  const body = await request.json();
  const {
    id,
    first_name,
    last_name,
    username,
    phone_number,
    email,
    profile_image_url,
  } = body;

  const payload: ProfilePayload = {
    id: id,
    first_name: first_name,
    last_name: last_name,
    username: username,
    phone_number: phone_number,
    email: email,
    profile_image_url: body.profile_image_url,
  };

  const { searchParams } = new URL(request.url);
  const profileId = searchParams.get("id");

  if (profileId) {
    return await updateProfile(payload.id, payload, supabase);
  }
}

async function updateProfile(
  id: string,
  payload: ProfilePayload,
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
      .from("user_profile")
      .update(payload)
      .eq("id", id);

    if (error) {
      console.error("Error fetching profile:", error);
      return NextResponse.json(
        { message: "Error updating profile" },
        { status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR }
      );
    }

    // if (!profile) {
    //   return NextResponse.json(
    //     { message: "profile not found" },
    //     { status: HTTP_STATUS_CODES.NOT_FOUND }
    //   );
    // }

    return NextResponse.json(
      { message: "Profile Updated Successfully" },
      { status: HTTP_STATUS_CODES.OK }
    );
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json(
      { message: "Error fetching profile" },
      { status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR }
    );
  }
}
