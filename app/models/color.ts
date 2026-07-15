import mongoose, { Document, Schema, ObjectId } from "mongoose";

export interface IColor {
    _id: ObjectId | string | undefined;
    hex: string;
    points: number;
    juego: string;
    color:string;
}
export interface IColorSchema extends Omit<Document, '_id'>, IColor { }

const colorSchema: Schema<IColorSchema> = new Schema({
    hex: { type: String, required: true },
    points: { type: Number, required: true },
    juego: { type: String, required: true }
}, {
    timestamps: true,
    versionKey: false
})
const Color = mongoose.models.Color || mongoose.model<IColorSchema>('Color', colorSchema);
export default Color;