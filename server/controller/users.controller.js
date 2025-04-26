import validator from 'validator';
import bcrypt from 'bcryptjs';
import { generateToken } from "../util/genrateToken.js";
import User from "../models/users.model.js";
import appError from '../util/AppError.js';
import { ERROR, FAIL } from '../util/httpsStat.js';



export const Login = async (req, res, next) => {
        const { email, password } = req.body;
        if (!email || !password) return next(AppError.init(false, 400, FAIL, "Email and password are required"));
        if (!validator.isEmail(email)) return next(AppError.init(false, 400, FAIL, "Invalid email"));
        try {
                const user = await User.findOne({ email });
                if (!user) return next(AppError.init(false, 400, FAIL, "User not found"));
                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) return next(AppError.init(false, 400, FAIL, "Invalid credentials"));
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
                return next(appError.init(false, 500, ERROR, error.message))
        }
};
export const Register = async (req, res, next) => {
        const { email, password } = req.body;
        if (!email || !password) {
                return next(AppError.init(false, 400, FAIL, "Please provide an email and password"))
        }
        if (!validator.isEmail(email)) {
                return next(AppError.init(false, 400, FAIL, "Please provide a valid email address"))
        }
        if (!validator.isStrongPassword(password)) {
                return next(AppError.init(false, 400, FAIL, "Please provide a strong password"))
        }

        try {
                const userExists = await User.findOne({ email });
                if (userExists) {
                        return next(AppError.init(false, 400, FAIL, "User already exists"))
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
                return next(appError.init(false, 500, ERROR, error.message))
        }

};