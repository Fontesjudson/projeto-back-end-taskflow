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
 function listarTodas() {
    return tarefas;
 }

 function buscarPorId(id) {
    return tarefas.find(t => t.id === id);
 }

<<<<<<< HEAD
 function adicionar(dados) {
   const nova = { id: proximoId++, ...dados };
    tarefas.push(nova);
    return nova;
 }

 function remover(id) {
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
