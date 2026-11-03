const criarErro = require('../../utils/criarErro');
const jwt = require('jsonwebtoken');
const usuarioModel = require('../models/usuario.model');

const authController = {
  login: async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha)
      throw criarErro(400, 'Email e senha sao obrigatorios');

    const usuario = await usuarioModel.buscarPorEmail(email);
    if (!usuario)
      throw criarErro(401, 'Credenciais inválidas');

    if (usuario.senha !== senha)
      throw criarErro(401, 'Credenciais inválidas');

       const token = jwt.sign(
         { id: usuario.id, nome: usuario.nome },
        process.env.JWT_SECRET,
        { expiresIn: '8h' }
);

        res.json({
            token,
            usuario: { id: usuario.id, nome: usuario.nome }
        });
},
};
module.exports = authController