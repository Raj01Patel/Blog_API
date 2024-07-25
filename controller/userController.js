const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserModel = require("../model/userModel");

const signUp = async (req, res) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(req.body.password, salt);

        const newUser = await UserModel.create({
            ...req.body,
            password: hashPassword,
        });

        res.json({
            success: true,
            message: "Registration completed, please login to continue",
        })
    }
    catch {
        res.json({
            success: false,
            message: "Something went wrong",
        });
    }
}

const login = async (req, res) => {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).json({
            success: false,
            message: "Invalid email ID or password",
        })
    }

    const isPasswordSame = await bcrypt.compare(req.body.password, user.password)
    if (!isPasswordSame) {
        return res.status(400).json({
            success: false,
            message: "Invalid password",
        })
    }

    const currentTimeInSeconds = Math.floor(new Date().getTime() / 1000);
    const expiryTimeInSeconds = currentTimeInSeconds + 3600; // 1hr from now

    const jwtPayload = {
        userId: user._id,
        mobileNo: user.mobileNo,
        exp: expiryTimeInSeconds,
    };

    const token = jwt.sign(jwtPayload, process.env.KEY)
    await UserModel.findByIdAndUpdate(user._id, { $set: { token } });

    res.json({
        success: false,
        message: "Login Successfully",
        token: token,
    })
}

const logout = async (req, res) => {
    try {
        const userId = req.user._id
        const user = await UserModel.findByIdAndUpdate(userId, {
            $unset: { token: "-" }
        });
        if (!user) {
            res.json({
                success: false,
                message: "User not found"
            });
        }
        res.json({
            success: true,
            message: "Logout successful"
        });
    } catch (err) {
        res.json({
            success: false,
            message: "An error occurred while logging out the user",
            error: err.message
        });
    }
}

const userController = {
    signUp,
    login,
    logout
}

module.exports = userController;