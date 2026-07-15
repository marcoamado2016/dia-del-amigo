import mongoose, { Document, Schema, ObjectId } from "mongoose";

export interface IColor {
    _id: ObjectId | string | undefined;
    puntoRojo: number;
    puntoAzul: number;
    puntoVerde: number;
    puntoAmarillo: number;
    points: number;
    juego: string;
}
export interface IColorSchema extends Omit<Document, '_id'>, IColor { }

const colorSchema: Schema<IColorSchema> = new Schema({
    puntoRojo: { type: Number, required: true },
    puntoAzul: { type: Number, required: true },
    puntoVerde: { type: Number, required: true },
    puntoAmarillo: { type: Number, required: true },
    juego: { type: String, required: true }
}, {
    timestamps: true,
    versionKey: false
})
const Color = mongoose.models.Color || mongoose.model<IColorSchema>('Color', colorSchema);
export default Color;