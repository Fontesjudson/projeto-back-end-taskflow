const express = require('express');
const tarefasRoutes = require('./src/routes/tarefas.routes');
const app = express();
const PORTA = 3001;
require('./src/controllers/tarefas.controllers');

app.use(express.json());

app.use('/tarefas', tarefasRoutes);

app.use('/projetos',projetosRoutes);

app.use((req, res) => {
    res.status(404).json({
        erro: 'Rota não encontrada' });
    });

app.listen(PORTA, () => {
    console.log('Servidor rodando em https://localhost:${PORTA}');
});
