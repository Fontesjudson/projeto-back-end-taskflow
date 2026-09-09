<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
let tarefas = [];
let proximoId = 1;

=======
=======
const express = require('express');
const router = express.Router();

>>>>>>> 13d29b6 (S11 dia 1 - middlewares de log e Content-Type)
const tarefas = [];
>>>>>>> 7463780 (taskflow API - semana 9 completa)
=======
let tarefas = [];
let proximoId = 1;

>>>>>>> 421cb10 (MVC S11 dia 2 finalizado)
 function listarTodas() {
    return tarefas;
 }

 function buscarPorId(id) {
    return tarefas.find(t => t.id === id);
 }

<<<<<<< HEAD
<<<<<<< HEAD
 function adicionar(dados) {
   const nova = { id: proximoId++, ...dados };
=======
 function adicionar(dados) {
    const nova = { id: proximoId++, ...dados };
>>>>>>> 421cb10 (MVC S11 dia 2 finalizado)
    tarefas.push(nova);
    return nova;
 }

 function remover(id) {
<<<<<<< HEAD
   tarefas = tarefas.filter(t => t.id !== id);
 }
 
module.exports = { listarTodas, buscarPorId, adicionar, remover };
=======
 function adicionar(tarefas) {
    tarefas.push(tarefa);
    return tarefa;
 }
 
Module.exports = { listarTodas, buscarPorId, adicionar };
>>>>>>> 7463780 (taskflow API - semana 9 completa)
=======
   tarefas = tarefas.filter(t => t.id !== id)
 }
 
Module.exports = { listarTodas, buscarPorId, adicionar, remover };
>>>>>>> 421cb10 (MVC S11 dia 2 finalizado)
