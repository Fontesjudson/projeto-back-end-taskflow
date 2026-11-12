const { json, parametroId }= require('./comum');

const paths = {
  '/tarefas': {
 get: {
   tags: ['Tarefas'],
   summary: 'Lista todas as tarefas',
   responses: {
     '200': { description: 'Lista de tarefas' },
   },},},
   '/tarefas/{id}': {
    get: {
      tags: ['Tarefas'],
      summary: 'Busca uma tarefa pelo id',
      parameters: [parametroId],
      responses: {
        '200': { description: 'Tarefa encontrada', content: json('Tarefa') },
        '400': { description: 'Id valido', content: json('erro') },
        '401': { description: 'Token ausente ou invalido', content: json('erro') },
        '404': { description: 'Tarefa não encontrada', content: json('erro') },
      },},},
      '/tarefas': {
        post: {
          tags: ['Tarefas'],
          summary: 'Criar uma tarefa',
          requestBody: { required: true, content: json('TarefaEntrada') },
          responses: {
            '201': { description: 'Tarefa criada', content: json('Tarefa') },
            '400': { description: 'Dados inválidos', content: json('Erro') },
            '401': { description: 'Token ausente ou inválido', content: json('Erro') },
          },},},
          '/tarefas/{id}': {
            put: {
              tags: ['Tarefas'],
              summary: 'Atualiza uma tarefa',
              parameters: [parametroId],
              requestBody: { required: true, content: json('TarefaEntrada') },
              responses: { 
                '200': { description: 'Tarefa atualizada', content: json('Tarefa') },
                '400': { description: 'alteração invalida', content: json('erro') },
                '401': { description: 'token invalido', content: json('erro') },
                '404': { description: 'Tarefa não encontrada', content: json('erro') },
               },},},
               '/tarefas/{id}': {
                delete: {
                  tags: ['Tarefas'],
                  summary: 'Exclui uma tarefa',
                  parameters: [parametroId],
                  responses: {
                    '200': {
                      description: 'Tarefa excluída',
                      content: { 'application/json': { schema: {
                        type: 'object',
                        properties: {
                         mensagem: { type: 'string', example: 'Tarefa removida' },
                          tarefa: { $ref: '#/components/schemas/Tarefa' },
                        },
                      } } },
                    },
                    '401': { description: 'Token ausente ou inválido', content: json('Erro'),},
                    '404': { description: 'Tarefa não encontrada', content: json('Erro') },},
                    
                  }
                }
               }


const schemas = {
    Tarefa: { 
      type: 'object', 
      properties: {
      id: { type: 'integer', example: 1 },
      texto: { type: 'string', example: 'Revisar layout' },
      coluna: { type: 'string', enum: ['afazer', 'andamento', 'concluido'] },
      ordem: { type: 'integer', example: 0 },
      usuario_id: { type: 'integer', example: 1 },
      projeto_id: { type: 'integer', example: 1 },
      idprioridade: { type: 'integer', example: 2 },
      criado_em: { type: 'string', format: 'date-time' },
      iniciada_em: { type: 'string', format: 'date-time', nullable: true },
      concluida_em: { type: 'string', format: 'date-time', nullable: true },
      projeto: { type: 'string', example: 'TaskFlow' },
      usuario: { type: 'string', example: 'Ana Lima' },
      prioridade: { type: 'string', example: 'Médio' },
}, }, 

TarefaEntrada: {
  type: 'object',
  properties: {
    texto: { type: 'string', example: 'Revisar layout' },
    coluna: { type: 'string', enum: ['afazer', 'andamento', 'concluido'] },
    usuario_id: { type: 'integer', example: 1 },
    projeto_id: { type: 'integer', example: 1 },
    idprioridade: { type: 'integer', example: 2 },
    ordem: { type: 'integer', example: 0 },
  }, },
};


module.exports = { paths, schemas };