import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = (payload) => {
    const token = jwt.sign(payload, JWT_SECRET);
    return token
}

export default generateToken;