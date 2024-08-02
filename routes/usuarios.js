import { Usuario } from '../models/usuario.js';
import { Endereco } from '../models/endereco.js';
import { Filme } from '../models/filme.js';
import { usuarioFilme } from '../models/usuarioFilme.js';
import { Router } from 'express';

export const usuarioRouter = Router();

// rota para listar todos os usuarios
usuarioRouter.get('/usuarios', async (req, res) => {
  // equivalente a SELECT * FROM usuario;
  const listaUsuario = await Usuario.findAll();
  res.json(listaUsuario);
});

// listando 1 Usuario
// Listagem de um Usuario específico (ID = ?)
// :id => parâmetro de rota
usuarioRouter.get('/usuarios/:id', async (req, res) => {
  // SELECT * FROM usuario WHERE id = 1;
  const UsuarioEncontrado = await Usuario.findOne({
    where: { id: req.params.id },
    include: [Endereco],
  });

  if (UsuarioEncontrado) {
    res.json(UsuarioEncontrado);
  } else {
    res.status(404).json({ message: "Usuario não encontrado!" });
  }
});

// rota para inserir um Usuario
usuarioRouter.post('/usuarios', async (req, res) => {
  // extraindo os dados do body que serao usados na inserção
  const { nome, email, telefone, endereco } = req.body;

  try {
    // tentativa de inserir o Usuario
    await Usuario.create({
      nome,
      email,
      telefone,
      endereco,
    },
      { include: [Endereco] } // indicando que o endereço será salvo e associado ao Usuario
    );
    res.status(201).json({ message: 'Usuario inserido com sucesso!' });

  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Erro ao inserir o Usuario!' }); // erro do lado do Usuario

    // 500 - erro do lado do servidor
    console.error(err);
    res.status(500).json({ message: 'Erro no servidor ao inserir o Usuario!' }); // erro do lado do servidor

  }

});

// rota para atualizar um Usuario
usuarioRouter.put('/usuarios/:id', async (req, res) => {
  const idUsuario = req.params.id;
  const { nome, email, telefone, endereco } = req.body;

  try {
    const UsuarioAtualizado = await Usuario.findOne({ where: { id: idUsuario } });

    if (UsuarioAtualizado) {
      // atualiza a linha do endereço que for o id do Usuario
      // for igual ao do Usuario sendo atualizado
      await Endereco.update(endereco, { where: { UsuarioId: idUsuario } });
      await UsuarioAtualizado.update({
        nome,
        email,
        telefone,
      });

      res.json({ message: 'Usuario atualizado com sucesso!' });
    } else {
      res.status(404).json({ message: 'Usuario não encontrado!' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao atualizar o Usuario!', error: err });
  }
});

// rota para deletar um Usuario
usuarioRouter.delete('/usuarios/:id', async (req, res) => {
  const idUsuario = req.params.id;

  try {
    const UsuarioDeletado = await Usuario.findOne({ where: { id: idUsuario } });

    if (UsuarioDeletado) {
      await UsuarioDeletado.destroy();
      res.json({ message: 'eu sou inevitavel! *estalo*' });
    } else {
      res.status(404).json({ message: 'Usuario não encontrado!' });
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao deletar o Usuario!', error: err });
  }
});

///-------------

// rota para adicionar um filme assistido pelo usuario
usuarioRouter.post('/usuarios/:usuarioId/filmes/:filmeId', async (req, res) => {
  const { usuarioId, filmeId } = req.params;

  try {
    const usuario = await Usuario.findByPk(usuarioId);
    const filme = await Filme.findByPk(filmeId);

    if (usuario && filme) {
      await usuario.addFilme(filme);
      res.status(200).json({ message: 'Filme adicionado ao usuario com sucesso!' });
    } else {
      res.status(404).json({ message: 'Usuario ou Filme não encontrado!' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao adicionar o Filme ao Usuario!', error: err });
  }
});

////----
usuarioRouter.get('/usuarios/:id/filmes', async (req, res) => {
  const usuarioId = req.params.id;

  try {
    const usuario = await Usuario.findByPk(usuarioId, {
      include: [{
        model: Filme,
        as: 'Filmes', // Use o alias correto
        through: { attributes: [] } // Isso evita que os atributos da tabela de junção sejam retornados
      }]
    });

    if (usuario && usuario.Filmes && usuario.Filmes.length > 0) {
      res.status(200).json(usuario.Filmes);
    } else {
      res.status(404).json({ message: 'Usuário não encontrado ou não possui filmes!' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao buscar os filmes do usuário!', error: err });
  }
});