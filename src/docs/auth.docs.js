const { json } = require('./comum');

const paths = {
  '/auth/login': {
    post: {
        tags: ['Autenticação'],
        summary: 'Realiza o login do usuário',
        security: [],
        requestBody: { required: true, content: json('Login') },
        responses: {
            '200': { description: 'Login feito', content: json('LoginResposta') },
            '400': { description: 'Email ou senha não informados', content: json('Erro') },
            '401': { description: 'Credenciais inválidas', content: json('Erro') },
        },
    },
  },
};

const schemas = {
  Login: {
    type: 'object',
    required: ['email', 'senha'],
    properties: {
      email: { type: 'string', format: 'email', example: 'user@example.com' },
      password: { type: 'string', format: 'password', example: 'senha123' },
    },
  },
  LoginResposta: {
    type: 'object',
    properties: {
      token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
      usuario: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          nome: { type: 'string', example: 'Ana Lima' },
        },
      },
    },
  },
};
module.exports = { paths, schemas };