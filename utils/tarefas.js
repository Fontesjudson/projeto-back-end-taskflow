let tarefas = [];
let proximoId = 1;

 function listarTodas() {
    return tarefas;
 }

 function buscarPorId(id) {
    return tarefas.find(t => t.id === id);
 }

 function adicionar(dados) {
    const nova = { id: proximoId++, ...dados };
    tarefas.push(nova);
    return nova;
 }

 function remover(id) {
   tarefas = tarefas.filter(t => t.id !== id)
 }
 
Module.exports = { listarTodas, buscarPorId, adicionar, remover };