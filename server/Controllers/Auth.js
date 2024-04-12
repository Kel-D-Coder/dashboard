const http = require("http-status-codes");
const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // validation (checking if username and email already exist);
        const checkUserName = await User.findOne({ username });
        if (checkUserName) {
            return res.status(http.StatusCodes.BAD_REQUEST).json({ msg: "username already exist" });
        };

        const checkEmail = await User.findOne({ email });
        if (checkEmail) {
            return res.status(http.StatusCodes.BAD_REQUEST).json({ msg: "email already exist" });
        } else if (!email.includes("@")) {
            return res.status(http.StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Email not valid" });
        }

        // hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);

        //create new user
        const newUser = await User.create({
            username,
            email,
            password: hashedPass
        })
        
        res.status(http.StatusCodes.CREATED).json({ msg: "Successfully registered", user: newUser });
    } catch (error) {
        res.status(http.StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message });
    }
}

const login = async (req, res) => {
    try {
        // validation (checking if username and email already password);
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(http.StatusCodes.BAD_REQUEST).json("Worng credentials!");
        }

        const validated = await bcrypt.compare(req.body.password, user.password);
        if (!validated) {
            return res.status(http.StatusCodes.BAD_REQUEST).json("Worng credentials!");
        }

        //Generating jsonwebtoken
        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '7d' });

        const { password, ...other } = user
        res.status(http.StatusCodes.OK).json({msg: "login successful", user: other._doc, token});
    } catch (error) {
        res.status(http.StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message });
    }
}

module.exports = {
    register,
    login
}