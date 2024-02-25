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
  const productId = searchParams.get("id");
  const query = searchParams.get("query");
  const sort = searchParams.get("sort");
  const order = searchParams.get("order");

  // If a product ID is provided, fetch the single product
  if (productId) {
    return await getProductById(request, productId, supabase);
  }

  // If a query is provided, fetch the products that match the query
  if (query || sort || order) {
    return await getProductsByQuery(query ?? "", order ?? "", sort ?? "");
  }

  // If no product ID is provided, fetch all products
  return await getAllProducts(supabase);
}

async function getProductById(
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

async function getAllProducts(supabase: SupabaseClient) {
  try {
    if (!supabase) {
      return NextResponse.json(
        { message: "Server Error" },
        { status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR }
      );
    }
    const { data: products, error } = await supabase.from("product").select();

    if (error) {
      console.error("Error fetching products:", error);
      return NextResponse.json(
        { message: "Error fetching products" },
        { status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR }
      );
    }
    if (!products) {
      return NextResponse.json(
        { message: "Products not found" },
        { status: HTTP_STATUS_CODES.NOT_FOUND }
      );
    }

    return NextResponse.json(products, { status: HTTP_STATUS_CODES.OK });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { message: "Error fetching products" },
      { status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR }
    );
  }
}

async function getProductsByQuery(
  query: string,
  order?: string,
  sort?: string,
  supabase?: SupabaseClient
) {
  try {
    if (!supabase) {
      return NextResponse.json(
        { message: "Server Error" },
        { status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR }
      );
    }
    let orderByObj;

    if (order && sort) {
      orderByObj = {
        [order]: sort,
      };
    }

    const { data: products, error } = await supabase
      .from("product")
      .select()
      .textSearch("name", query)
      .order("id", {
        ascending: true,
      });

    if (error) {
      console.error("Error fetching products:", error);
      return NextResponse.json(
        { message: "Error fetching products" },
        { status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR }
      );
    }

    if (!products) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: HTTP_STATUS_CODES.NOT_FOUND }
      );
    }

    return NextResponse.json(products, { status: HTTP_STATUS_CODES.OK });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { message: "Error fetching products" },
      { status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR }
    );
  }
}
