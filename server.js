<<<<<<< HEAD
require('dotenv').config();

const express = require('express');
const cors = require('cors');

const autenticar = require('./src/middlewares/autenticar');
const authRoutes = require('./src/routes/auth.routes');
// const tarefasRoutes = require('./src/routes/tarefas.routes');
const usuariosRoutes = require('./src/routes/usuarios.routes');
const projetosRoutes = require('./src/routes/projetos.routes');

const logger = require('./src/middlewares/logger');
const validarContentType = require('./src/middlewares/validarContentType');
const temporizador = require('./src/middlewares/temporizador');

const app = express();
const PORTA = 3001;

app.use(cors());
app.use(express.json());
app.use(validarContentType);
app.use(logger);
app.use(temporizador);
=======
const express = require('express');
const validarContentType = require('./utils/src/middlewares/validarContentType');
const logger = require('./utils/src/middlewares/logger');
const tarefasRoutes = require('./utils/src/routes/tarefas.routes');
const usuariosRoutes = require('./utils/src/routes/usuarios.routes');
const projetosRoutes = require('./utils/src/routes/projetos.routes');

const app = express();
app.use(validarContentType);
app.use(logger);
const PORTA = 3000;
app.use(express.json());
>>>>>>> 13d29b6 (S11 dia 1 - middlewares de log e Content-Type)

app.get('/', (req, res) => {
    res.json({ mensagem: 'TaskFlow API funcionando!' });
});

<<<<<<< HEAD
app.use('/auth', authRoutes);
app.use('/usuarios', autenticar, usuariosRoutes);
// app.use('/tarefas', autenticar, tarefasRoutes);
app.use('/projetos', autenticar, projetosRoutes);

app.use((req, res) => {
    res.status(404).json({
        erro: '*Rota não encontrada*' });
    });

app.listen(PORTA, () => {
    console.log(`Servidor rodando em http://localhost:${PORTA}`);
});
=======
app.use('/usuarios', usuariosRoutes);
app.use('/tarefas', tarefasRoutes);
app.use('/projetos',projetosRoutes);

app.use((req, res) => {
    res.status(404).json({
        erro: 'Rota não encontrada' });
    });

app.listen(PORTA, () => {
    console.log('Servidor rodando em https://localhost:${PORTA}');
});
>>>>>>> 13d29b6 (S11 dia 1 - middlewares de log e Content-Type)
