require('dotenv').config();

const express = require('express');
const cors = require('cors');

//const autenticar = require('./src/middlewares/autenticar');
const { pool } = require ('./src/database/db');
const authRoutes = require('./src/routes/auth.routes');
//const tarefasRoutes = require('./src/routes/tarefas.routes');
const usuariosRoutes = require('./src/routes/usuarios.routes');
const projetosRoutes = require('./src/routes/projetos.routes');

const logger = require('./src/middlewares/logger');
const validarContentType = require('./src/middlewares/validarContentType');
const temporizador = require('./src/middlewares/temporizador');

const app = express();
const PORTA = process.env.PORTA || 3001;

app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeader: ['Content-Type', 'Authorization'],   
 }));

 pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Erro ao conectar:', err.message);
    } else {
        console.log('Banco conectado:.', res.rows[0].now);
    }
});

//app.use(cors());
app.use(express.json());
app.use(validarContentType);
app.use(logger);
app.use(temporizador);

app.get('/', (req, res) => {
    res.json({ mensagem: 'TaskFlow API funcionando!' });
});

app.use('/auth', authRoutes);
app.use('/usuarios', /*autenticar,*/ usuariosRoutes);
//app.use('/tarefas', /*autenticar,*/ tarefasRoutes);
app.use('/projetos', /*autenticar,*/ projetosRoutes);

app.use((req, res) => {
    res.status(404).json({
        erro: '*Rota não encontrada*' });
    });

app.listen(PORTA, () => {
    console.log(`Servidor rodando em http://localhost:${PORTA}`);
});