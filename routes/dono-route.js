const express = require('express');
const router = express.Router();
const Login = require("../middleware/login-middleware");


const DonoController = require("../controllers/dono-controller");

router.post("/create", DonoController.createDono);
router.post("/login", DonoController.login);


module.exports = router;