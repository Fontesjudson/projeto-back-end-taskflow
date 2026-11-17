require('./app');

const express = require('express')
const { pool } = require ('./src/database/db');
const app = express();
const PORTA = process.env.PORTA || 3001;
const tratarErros = require('./src/middlewares/erro.middlewares');

 pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Erro ao conectar:', err.message);
    } else {
        console.log('Banco conectado:.', res.rows[0].now);
    }
});


app.get('/', (req, res) => {
    res.json({ mensagem: 'TaskFlow API funcionando!' });
});

app.use((req, res) => {
    const rota = `${req.method} ${req.url}`;
    throw criarErro(404, `Rota ${rota} não encontrada`);
    });
app.use(tratarErros);

app.listen(PORTA, () => {
    console.log(`Servidor rodando em http://localhost:${PORTA}`);
});