const express = require("express");
const router = express.Router();
const { allUsers, deleteUser } = require('../Controllers/User');

router.route('/').get(allUsers);
router.route('/:id').delete(deleteUser);

module.exports = router