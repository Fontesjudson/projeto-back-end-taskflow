require('dotenv').config({ path: '.env.test', quiet: true });

if (process.env.AMBIENTE !== 'teste') {
    throw new Error('crie um arquivo .env.test antes de rodar os testes');
}