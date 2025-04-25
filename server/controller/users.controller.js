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
                const token = await generateToken({ id: user._id }, "1d");
                return res.status(200).json({
                        success: true,
                        message: "Login successful",
                        user: {
                                id: user._id,
                                email: user.email
                        },
                        token
                });
        } catch (error) {
                return res.status(500).json({ message: "Internal server error" });
        }
};


export const Register = async (req, res) => {
        const { email, password } = req.body;

        if (!email || !password) {
                return res
                        .status(400)
                        .json({ success: false, message: "Please provide an email and password" });
        }

        if (!validator.isEmail(email)) {
                return res
                        .status(400)
                        .json({ success: false, message: "Please provide a valid email" });
        }

        if (!validator.isStrongPassword(password)) {
                return res
                        .status(400)
                        .json({ success: false, message: "Please provide a strong password" });
        }

        try {
                const userExists = await User.findOne({ email });

                if (userExists) {
                        return res
                                .status(400)
                                .json({ success: false, message: "User already exists" });
                }

                const salt = await bcrypt.genSalt(10);

                const hashedPassword = await bcrypt.hash(password, salt);

                const savedUser = await new User({
                        email,
                        password: hashedPassword,
                }).save();
                console.log("savedUser", savedUser);
                const token = await generateToken({ id: savedUser._id }, "1d");


                res.status(200).json({ success: true, token });
        } catch (error) {
                res.status(500).json({ success: false, message: error.message });
        }

};