import mongoose, { Schema } from "mongoose";

const LinkSchema = new Schema({
    longUrl: { type: String, required: true },
    shortUrl: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    createdAt: { type: Date, default: Date.now },
    clicks: {type: Number, default: 0},
})

export default mongoose.models.Link || mongoose.model("Link", LinkSchema);