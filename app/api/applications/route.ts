import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { v4 as uuidv4 } from 'uuid'; // Saya akan gunakan Date.now() saja agar tidak perlu install uuid

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log("--- START LOWDB SUBMISSION ---");

    const db = await getDb();
    
    const newRecord = {
      ...data,
      id: `app_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };

    // Tambahkan ke array dan simpan ke file
    await db.update(({ applications }) => applications.unshift(newRecord));

    console.log("SUCCESS: Application saved to JSON!");
    return NextResponse.json({ success: true, id: newRecord.id });
  } catch (error: any) {
    console.error("JSON SUBMISSION FAILED:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to save to JSON" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const db = await getDb();
    return NextResponse.json(db.data.applications);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
