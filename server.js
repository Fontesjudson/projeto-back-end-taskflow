require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { pool } = require ('./src/database/db');
const authRoutes = require('./src/routes/auth.routes');
const tarefasRoutes = require('./src/routes/tarefas.routes');
const usuariosRoutes = require('./src/routes/usuarios.routes');
const projetosRoutes = require('./src/routes/projetos.routes');
const prioridadesRoutes = require('./src/routes/prioridades.routes');
const tratarErros = require('./src/middlewares/erro.middlewares');
//const criarErro = require('./src/utils/criarErro');
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

app.use(express.json());
app.use(validarContentType);
app.use(logger);
app.use(temporizador);

app.get('/', (req, res) => {
    res.json({ mensagem: 'TaskFlow API funcionando!' });
});

app.use('/auth', authRoutes);
app.use('/usuarios', usuariosRoutes);
app.use('/tarefas', tarefasRoutes);
app.use('/projetos', projetosRoutes);
app.use('/prioridades', prioridadesRoutes);
app.use((req, res) => {
    const rota = `${req.method} ${req.url}`;
    throw criarErro(404, `Rota ${rota} não encontrada`);
    });
app.use(tratarErros);

app.listen(PORTA, () => {
    console.log(`Servidor rodando em http://localhost:${PORTA}`);
});