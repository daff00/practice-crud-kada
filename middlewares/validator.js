export const checkBody = (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ success: false, error: "Body request tidak boleh kosong" });
    }
    next();
}