const express = require('express');
const router = express.Router();
const Login = require("../middleware/login-middleware");


const DonoController = require("../controllers/dono-controller");

router.post("/cadastro", DonoController.cadastroDono);
router.post("/login", DonoController.login);


module.exports = router;