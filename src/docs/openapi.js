const tarefas = require('./tarefas.docs');

module.exports = {
  openapi: '3.0.3',
  info: {
    title: 'TaskFlow API',
    version: '1.0.0',
    description: 'API do TaskFlow SENAI CT-GAS', 
  },
  servers: [{ url: 'http://localhost:3001', description: 'Local' }],
  security: [{ bearerAuth: [] }],
  paths: { ...tarefas.paths },

    components: {
     schemas: { /*...comum.schemas*/ ...tarefas.schemas },
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
