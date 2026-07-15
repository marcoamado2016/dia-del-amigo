import Color from "@/app/models/color";
import { connectMongoDB } from "@/libs/mongoDb";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    await connectMongoDB();
    console.log("LLEGUE A LA BASE ")
    const { searchParams } = new URL(request.url);
    const juego = searchParams.get("juego");
    console.log("juego1234", juego)
    let respuesta
    if (juego) {
        respuesta = await Color.find({ juego: juego });
        return new Response(JSON.stringify(respuesta), {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } else {
        respuesta = await Color.find({});
        return new Response(JSON.stringify(respuesta), {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}