import jwt from "jsonwebtoken";

const SECRET = process.env.SECRET;

const generateToken = (payload) => {
    const token = jwt.sign(payload, SECRET);
    return token
}

export default generateToken;