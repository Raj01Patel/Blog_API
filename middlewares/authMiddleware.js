const UserModel = require("../model/userModel")
const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
    try {
        const bearerToken = req.headers.authorization;
        if (!bearerToken) {
            return res.status(401).json({
                success: false,
                meassage: "Unauthorized",
            });
        }

        const token = bearerToken.split(" ")[1];

        jwt.verify(token, process.env.KEY);

        const tokenData = jwt.decode(token);

        const currentTime = Math.floor(new Date().getTime() / 1000);

        if (currentTime > tokenData.exp) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            })
        }

        const user = await UserModel.findById(tokenData.userId);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            })
        }
        req.user = user;
        next();
    }
    catch (err) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        })
    }
}

module.exports = authMiddleware;