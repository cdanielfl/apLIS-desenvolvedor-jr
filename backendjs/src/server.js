const express = require('express');
const cors = require('cors');
require("dotenv").config();
const pacienteRoutes = require("./routes/pacienteRoutes");

const app = express (); 
// Pega a porta do .env. Se nao tiver, usa 3001.
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
// Todas as rotas de paciente vao com /api/v1 na frente.
app.use("/api/v1", pacienteRoutes); 

app.get("/health", (req, res) => {
    res.json({ status: "OK" });
});  

app.listen(PORT, () => {
    console.log(`Servidor rodando: http://localhost:${PORT}`);
});
