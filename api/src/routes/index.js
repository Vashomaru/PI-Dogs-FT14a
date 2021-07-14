const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const TemperamentsRouter = require("./temperaments")
const DogsRouter = require("./dogs")

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/', TemperamentsRouter);
router.use('/', DogsRouter);


module.exports = router;
