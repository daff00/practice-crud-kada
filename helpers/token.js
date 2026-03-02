import jwt from "jsonwebtoken";

const secret = 'secret';

const generateToken = (payload) => {
    const token = jwt.sign(payload, secret);
    return token
}

export default generateToken;