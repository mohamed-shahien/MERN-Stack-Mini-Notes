import jwt from 'jsonwebtoken';
import appError from '../util/AppError.js';
import { FAIL } from '../util/httpsStat.js';

export const requireAuth = async (req, res, next) => {
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];
    if (!authHeader) return next(appError.init(false, 401, FAIL, "Authorization token is required"));
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) return next(appError.init(false, 401, FAIL, "Invalid token"));
        req.userId = decoded.id;
        next();
    });
};
