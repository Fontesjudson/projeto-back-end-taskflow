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

/*app.use(cors({
    origin: '*',//process.env.CORS_ORIGIN || 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeader: ['Content-Type', 'Authorization'],
    
 }));*/

 app.use(cors({
  origin: 'https://taskflow-henna-nine.vercel.app', // Sua URL da Vercel
  credentials: true, // Se você usar cookies ou headers de autenticação
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
 }))
//app.use(cors());
app.use(express.json());
app.use(validarContentType);
app.use(logger);
app.use(temporizador);

app.get('/', (req, res) => {
    res.json({ mensagem: 'TaskFlow API funcionando!' });
});

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