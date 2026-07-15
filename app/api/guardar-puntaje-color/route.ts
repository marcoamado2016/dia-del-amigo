import Color, { IColorSchema } from "@/app/models/color";
import { connectMongoDB } from "@/libs/mongoDb";
import { NextRequest, NextResponse } from "next/server";

export interface propsI {
    puntoRojo: number | string;
    puntoAzul: number | string;
    puntoVerde: number | string;
    puntoAmarillo: number | string;
    juego: string;
}

export async function POST(request: NextRequest) {
    await connectMongoDB();
    const body = (await request.json()) as propsI;
    const puntoRojo = Number(body.puntoRojo);
    const puntoAzul = Number(body.puntoAzul);
    const puntoVerde = Number(body.puntoVerde);
    const puntoAmarillo = Number(body.puntoAmarillo);
    const juego = body.juego?.toString().trim();

    if (!juego || [puntoRojo, puntoAzul, puntoVerde, puntoAmarillo].some((value) => Number.isNaN(value))) {
        return NextResponse.json({ message: "Faltan datos requeridos o valores inválidos" }, { status: 400 });
    }

    const colorDoc: IColorSchema = new Color({ puntoRojo, puntoAzul, puntoVerde, puntoAmarillo, juego });
    await colorDoc.save();

    return NextResponse.json({ message: "Puntaje guardado exitosamente" }, { status: 201 });
}
