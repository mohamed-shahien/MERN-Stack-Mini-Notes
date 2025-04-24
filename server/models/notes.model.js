import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema(
        {
                userId: {
                        type: String,
                        required: true,
                        default: "unknown-user", 
                },
                title: {
                        type: String,
                        required: true,
                        default: "Untitled Note", 
                },
                description: {
                        type: String,
                        required: true,
                        default: "", 
                },
                color: {
                        type: String,
                        required: true,
                        default: "#ffffff",
                },
                createdAt: {
                        type: Date,
                        default: Date.now,
                }
        }
);

export default mongoose.model("Note", NoteSchema);
