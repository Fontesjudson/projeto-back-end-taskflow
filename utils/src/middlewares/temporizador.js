function temporizador(req, res, next) {
    const inicio = Date.now();
    next();
    const fim = Date.now();
    console.log(`Tempo de execução: ${fim - inicio} ms`);
}
module.exports = temporizador;