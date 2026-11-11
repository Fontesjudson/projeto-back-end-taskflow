function formatarTarefa(tarefa) {
  const { projetos, usuarios, prioridades, ...resto } = tarefa;
  return {
    ...resto,
    projeto: projetos?.nome,
    usuario: usuarios?.nome,
    prioridades: prioridades?.descricao,
  };
}
module.exports = formatarTarefa;