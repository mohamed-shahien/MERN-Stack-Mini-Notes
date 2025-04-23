import jwt from 'jsonwebtoken';

export const requireAuth = async (req, res, next) => {
        const authHeader = req.headers['authorization'] || req.headers['Authorization'];
        if (!authHeader) {
                return res.status(401).json({ message: "Authorization token is required" });
        }
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
                if (err) {
                        return res.status(401).json({ message: "Invalid token" });
                }
                const { id } = decoded;
                req.userId = id;
                next();
        });
};