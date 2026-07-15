import { connectMongoDB } from "@/libs/mongoDb";
import { NextRequest } from "next/server";
export interface propsI {
    hex: string;
    points: number;
    juego: string;
}
export async function POST(request: NextRequest) {
    await connectMongoDB();
    const body = await request.json();
    const { hex, points, juego } = body as propsI;
}