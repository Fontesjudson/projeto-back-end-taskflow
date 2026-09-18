<<<<<<< HEAD
<<<<<<< HEAD
require('dotenv').config();

const express = require('express');
const cors = require('cors');

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
const autenticar = require('./src/middlewares/autenticar');
=======
const autenticar = require('/src/middlewares/autenticar');
>>>>>>> 9d359ef (S11 dia 4 - autenticação jwt e rotas protegidas)
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
=======
const autenticar = require('./src/middlewares/autenticar');
const authRoutes = require('./src/routes/auth.routes');
// const tarefasRoutes = require('./src/routes/tarefas.routes');
>>>>>>> 6f4990e (S12 dia 4 finalizado)
const usuariosRoutes = require('./src/routes/usuarios.routes');
const projetosRoutes = require('./src/routes/projetos.routes');

const logger = require('./src/middlewares/logger');
const validarContentType = require('./src/middlewares/validarContentType');
const temporizador = require('./src/middlewares/temporizador');
// const corsMiddleware = require('./src/middlewares/corsMiddlewares')

const app = express();
const PORTA = 3001;

app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeader: ['Content-Type', 'Authorization'],
    
 }));
 // app.use(corsMiddleware);
app.use(express.json());
app.use(validarContentType);
app.use(logger);
<<<<<<< HEAD
const PORTA = 3000;
app.use(express.json());
>>>>>>> 13d29b6 (S11 dia 1 - middlewares de log e Content-Type)
=======
app.use(temporizador);
<<<<<<< HEAD
app.use(corsMiddleware);
>>>>>>> 421cb10 (MVC S11 dia 2 finalizado)
=======
>>>>>>> 6f4990e (S12 dia 4 finalizado)

app.get('/', (req, res) => {
    res.json({ mensagem: 'TaskFlow API funcionando!' });
});

<<<<<<< HEAD
<<<<<<< HEAD
app.use('/auth', authRoutes);
app.use('/usuarios', autenticar, usuariosRoutes);
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
app.use('/tarefas', autenticar, tarefasRoutes);
=======
// app.use('/tarefas', autenticar, tarefasRoutes);
>>>>>>> 6f4990e (S12 dia 4 finalizado)
app.use('/projetos', autenticar, projetosRoutes);
>>>>>>> 9d359ef (S11 dia 4 - autenticação jwt e rotas protegidas)

app.use((req, res) => {
    res.status(404).json({
        erro: '*Rota não encontrada*' });
    });

app.listen(PORTA, () => {
    console.log(`Servidor rodando em http://localhost:${PORTA}`);
});
>>>>>>> 13d29b6 (S11 dia 1 - middlewares de log e Content-Type)
