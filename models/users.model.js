import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
        {
                firstNName: {
                        type: String,
                        required: true,
                        default: "Untitled Note", 
                },
                LastName: {
                        type: String,
                        required: true,
                        default: "Untitled Note", 
                },
                email: {
                        type: String,
                        required: true,
                        default: "", 
                },
                password: {
                        type: String,
                        required: true,
                        default: "#ffffff",
                }
        }
);

export default mongoose.model("User", UserSchema);
