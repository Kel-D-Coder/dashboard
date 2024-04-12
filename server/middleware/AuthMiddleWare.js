const jwt = require("jsonwebtoken");
const http = require("http-status-codes");

const verifyToken = async (req, res, next) => {
    const authHeaders = req.headers.authorization;

    if (!authHeaders || !authHeaders.startswith("Bearer ")) {
        res.status(http.StatusCodes.UNAUTHORIZED).json({ msg: "Not logged in" });
    }

    const token = authHeaders.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.SECRET_TOKEN);

        const { id, username } = decoded

        req.user = { id, username }
        
        next()
    } catch (error) {
        res.status(401).send("Not authorized to access this route");
    }

}

module.exports = verifyToken;