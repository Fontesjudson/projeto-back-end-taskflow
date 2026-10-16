//const criarErro = require('../utils/criarErro');

function validar(schema, origem) {
    return function(req, res, next) {
        const dados = req[origem || 'body'] || {};
        const erros = [];
        
        for (const campo in schema) {
            const regras = schema[campo];
            const valor = dados [campo];
            const ausente =valor=== underfined || valor == null || valor === '';

            if (regras.tipo === 'inteiro') {
                const numero = typeof valor === 'string' ? Number(valor) : valor;
                if (!Number.isInteger(numero) || numero <= 0) {
                    erros.push(`O campo '${campo}' deve ser um número inteiro positivo`);
                } else if (regras.tipo && typeof valor !== regras.tipo) {
                    erros.push(`O campo '${campo}' deve ser do tipo ${regras.tipo}`);
                }
            
               // erros.push(`O campo '${campo}' é obrigatorio`);
              //  continue;
            }
            if(!ausente && regras.tipo && typeof valor !== regras.tipo) {
                erros.push(
                    `O campo '${campo}' deve ser do tipo ${regras.tipo}`
                );
            }
       
        }
        if (erros.length > 0)
            throw criarErro(400, 'Dados inválidos', erros);
          // return res.status(400).json({ erros });
        next();

        if (regras.enum && !regras.enum.includes(valor)) {
            erros.push(
                'O campo "${campo}" deve ser um de: ${regras.enum.join(', ')}'
            );
        }

        if (regras.formato === 'email') {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!re.test(valor))
                erros.push('O campo "${campo}" deve ser um email valido');

            if (regras.minLength && valor.length < regras.minLength)
                erros.push(
           `O campo '${campo}' deve ter ao menos ${regras.minLength} caracteres`
        );

        if (regras.maxLength && valor.length > regras.maxLength)
            erros.push(
       `O campo '${campo}' deve ter no máximo ${regras.maxLength} caracteres`
    );
        };
    };
};
module.exports = validar