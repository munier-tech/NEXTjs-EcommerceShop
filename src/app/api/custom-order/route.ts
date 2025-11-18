import { writeClient } from "@/sanity/lib/writeClient";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // Check if request body is valid JSON
    let data;
    try {
      data = await req.json();
    } catch (parseError) {
      console.error("JSON parse error:", parseError);
      return NextResponse.json(
        { success: false, message: "Invalid JSON in request body" },
        { status: 400 }
      );
    }

    console.log("API received data:", data);

    // Validate required fields
    if (!data.productName || !data.description || !data.customerName || !data.customerEmail) {
      return NextResponse.json(
        { 
          success: false, 
          message: "Missing required fields: productName, description, customerName, and customerEmail are required" 
        },
        { status: 400 }
      );
    }

    const doc = {
      _type: "customOrder",
      productName: data.productName,
      description: data.description,
      budget: data.budget || null,
      productLink: data.productLink || "",
      image: data.image || "",
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      customerPhone: data.customerPhone || "",
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    console.log("Creating Sanity document:", doc);

    const result = await writeClient.create(doc);
    console.log("Sanity creation successful, document ID:", result._id);

    return NextResponse.json({ 
      success: true, 
      message: "Order submitted successfully",
      id: result._id 
    });

  } catch (error) {
    console.error("Custom Order API Error:", error);
    
    // More detailed error information
    if (error instanceof Error) {
      console.error("Error name:", error.name);
      console.error("Error message:", error.message);
    }

    return NextResponse.json(
      { 
        success: false, 
        message: "Failed to submit order",
        error: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}

// Also add a GET method to confirm the route is working
export async function GET() {
  return NextResponse.json({ 
    message: "Custom order API is running",
    timestamp: new Date().toISOString()
  });
}