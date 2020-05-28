const express = require('express');
const router = express.Router();
const Login = require("../middleware/login-middleware");

const AnimalController = require("../controllers/animal-controller");

router.post("/cadastro", Login.required, AnimalController.cadastrarAnimal);
router.put("/atualizar", Login.required, AnimalController.atualizarAnimal);
router.put("/excluir", Login.required, AnimalController.excluirAnimal);


module.exports = router;