import Color, { IColorSchema } from "@/app/models/color";
import { connectMongoDB } from "@/libs/mongoDb";
import { NextRequest, NextResponse } from "next/server";
export interface propsI {
    hex: string;
    points: number;
    juego: string;
    color: string;
}
export async function POST(request: NextRequest) {
    await connectMongoDB();
    const body = await request.json();
    const { hex, points, juego, color } = body as propsI;
    if (!hex || !points || !juego || !color) {
        return NextResponse.json({ message: "Faltan datos requeridos" }, { status: 400 });
    }
    const colorDoc: IColorSchema = new Color({ hex, points, juego, color });
    await colorDoc.save();
    return NextResponse.json({ message: "Puntaje guardado exitosamente" }, { status: 201 });
}