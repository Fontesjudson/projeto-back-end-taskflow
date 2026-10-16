const schemas = {

    id: {
        obrigatorio: true,
        tipo: 'inteiro',
    },

    tarefa: {
        texto: { obrigatorio: true, tipo: 'string' },
        prioridade: { obrigatorio: true, tipo: 'string', enum: ['alta', 'media', 'baixa' ] },
        coluna: { obrigatorio: true, tipo: 'string', enum: ['afazer', 'andamento', 'concluido'] },
        usuarioId: { obrigatorio: true, tipo: 'inteiro'},
        projetoId: { obrigatorio: true, tipo: 'inteiro'},
        idprioridade: { obrigatorio: true, tipo: 'inteiro'},
    },

    usuario: {
        nome: { obrigatorio: true, tipo: 'string', minLength: 3},
        email: { obrigatorio: true, tipo:'string', formato: 'email'},
        senha: { obrigatorio: true, tipo: 'string', minLength: 6},
    },

    projeto: {
        nome: { obrigatorio: true, tipo: 'string'},
        descriçao: { obrigatio: false, tipo: 'string', maxLength: 200},
    },
    };
    module.exports = schemas;