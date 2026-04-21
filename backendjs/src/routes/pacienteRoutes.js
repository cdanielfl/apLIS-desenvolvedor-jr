const express = require("express");
const router = express.Router();
const pacienteController = require("../controllers/pacienteController");

// Mapeia rota para funcao do controller.
router.get("/pacientes", pacienteController.listarPacientes);
router.get("/pacientes/:id", pacienteController.buscarPaciente);
router.post("/pacientes", pacienteController.criarPaciente);
router.put("/pacientes/:id", pacienteController.atualizarPaciente);
router.delete("/pacientes/:id", pacienteController.removerPaciente);

module.exports = router;
