import validator from 'validator';
import bcrypt from 'bcryptjs';
import { generateToken } from "../util/genrateToken.js";
import User from "../models/users.model.js";



export const Login = async (req, res) => {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ message: "Email and password are required" });
        if (!validator.isEmail(email)) return res.status(400).json({ message: "Invalid email" });
        try {
                const user = await User.findOne({ email });
                if (!user) return res.status(400).json({ message: "User not found" });
                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
                const token = await generateToken({ id: user._id, password: user.password }, "1d");
                return res.status(200).json({
                        message: "Login successful",
                        user: {
                                id: user._id,
                                email: user.email,
                                password: user.password
                        },
                        token: token
                });
        } catch (error) {
                return res.status(500).json({ message: "Internal server error" });
        }

}

export const Register = async (req, res) => {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ message: "Email and password are required" });
        if (!validator.isEmail(email)) return res.status(400).json({ message: "Invalid email" });
        if (!validator.isStrongPassword(password)) return res.status(400).json({ message: "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one symbol" });
        try {
                const userExest = await User.findOne({ email });
                if (!userExest) {
                        return res
                                .status(400)
                                .json({ success: false, error: "User already exists" });
                } const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);
                const saveUser = await new User({
                        email: email,
                        password: hashedPassword
                }).save();
                const token = await generateToken({ id: saveUser._id }, "1d");
                return res.status(200).json({
                        message: "User created successfully",
                        user: {
                                id: saveUser._id,
                                email: saveUser.email,
                                password: hashedPassword
                        },
                        token: token
                });
        } catch (error) {
                return res.status(500).json({ message: "Internal server error" });
        }
}
