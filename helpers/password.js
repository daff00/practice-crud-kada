import bcrypt from "bcryptjs";

const hash = (password) => {
    const salt = bcrypt.genSaltSync(10);
    const hashedPass = bcrypt.hashSync(password, salt);
    return hashedPass
}

const compare = (password, hashedPassword) => {
    const isMatch = bcrypt.compareSync(password, hashedPassword)
    return isMatch
}

export default { hash, compare };