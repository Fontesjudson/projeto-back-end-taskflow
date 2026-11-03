const tarefas = require('./tarefas.docs');
const comum = require('./comum');
const auth = require('./auth.docs');


module.exports = {
  openapi: '3.0.3',
  info: {
    title: 'TaskFlow API',
    version: '1.0.0',
    description: 'API do TaskFlow SENAI CT-GAS', 
  },
  servers: [{ url: 'http://localhost:3001', description: 'Local' }],
  tags: [
    { name: 'Autenticação', description: 'Login e token JWT' },
    { name: 'tarefas', description: 'Cards do Kanban' },
  ],

  security: [{ bearerAuth: [] }],
  paths: 
  { ...auth.paths,
    ...tarefas.paths,
   },


    components: {
     schemas: { ...comum.schemas, ...tarefas.schemas },
     securitySchemes: {
      bearerAuth: {
       type: 'http',
       scheme: 'bearer',
       bearerFormat: 'JWT',

    // schemas: { ...comum.schemas, ...tarefas.schemas },
   },
  },
 },
}
