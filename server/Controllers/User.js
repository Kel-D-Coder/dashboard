const User = require("../models/UserModel");
const http = require("http-status-codes");

const allUsers = async (req, res) => {
    res.status(http.StatusCodes.OK).json({ msg: "All users" });
}

const deleteUser = async (req, res) => {
    res.status(http.StatusCodes.GONE).json({ msg: "Delete user" });
}

module.exports = {
    allUsers,
    deleteUser
}