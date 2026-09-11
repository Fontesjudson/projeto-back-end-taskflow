<<<<<<< HEAD
<<<<<<< HEAD
require('dotenv').config();

const express = require('express');
const cors = require('cors');

<<<<<<< HEAD
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
=======
require('dotenv').config();

>>>>>>> 421cb10 (MVC S11 dia 2 finalizado)
const express = require('express');
const cors = require('cors');

=======
const authRoutes = require('./src/routes/auth.routes');
>>>>>>> 4f76d16 (MVC S11 dia 4 finalizado)
const tarefasRoutes = require('./src/routes/tarefas.routes');
const usuariosRoutes = require('./src/routes/usuarios.routes');
const projetosRoutes = require('./src/routes/projetos.routes');

const logger = require('./src/middlewares/logger');
const validarContentType = require('./src/middlewares/validarContentType');
const temporizador = require('./src/middlewares/temporizador');
const corsMiddleware = require('./src/middlewares/corsMiddlewares')

const app = express();
const PORTA = 3000;

app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeader: ['Content-Type', 'Authorization'],
    
 }));
app.use(express.json());
app.use(validarContentType);
app.use(logger);
<<<<<<< HEAD
const PORTA = 3000;
app.use(express.json());
>>>>>>> 13d29b6 (S11 dia 1 - middlewares de log e Content-Type)
=======
app.use(temporizador);
app.use(corsMiddleware);
>>>>>>> 421cb10 (MVC S11 dia 2 finalizado)

app.get('/', (req, res) => {
    res.json({ mensagem: 'TaskFlow API funcionando!' });
});

<<<<<<< HEAD
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
=======
app.use('/auth', authRoutes);
>>>>>>> 4f76d16 (MVC S11 dia 4 finalizado)
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
