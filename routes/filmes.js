import { Filme } from '../models/filme.js';
import { Usuario } from '../models/usuario.js';
import { Router } from 'express';

export const filmeRouter = Router();

// rota para listar todos os filmes
filmeRouter.get('/filmes', async (req, res) => {
  // equivalente a SELECT * FROM filmes;
  const listaFilme = await Filme.findAll();
  res.json(listaFilme);
});

filmeRouter.get('/filmes/:id', async (req, res) => {
  // SELECT * FROM filme WHERE id = 1;
  const filmeEncontrado = await Filme.findOne({
    where: { id: req.params.id },
    // Está incluindo usuarios
    include: [
      {
        model: Usuario,
        as: 'Usuarios',
        attributes: ['id', 'nome'],
      },
    ],
  });

  if (filmeEncontrado) {
    res.json(filmeEncontrado);
  } else {
    res.status(404).json({ message: "filme não encontrado!" });
  }
});


// Rota para adicionar um novo filme
filmeRouter.post('/filmes', async (req, res) => {
  try {
    const { titulo, diretor, genero, anoLancamento } = req.body;

    // Cria um novo filme
    const novoFilme = await Filme.create({ titulo, diretor, genero, anoLancamento });
    res.status(201).json({ message: 'filme inserido com sucesso!', novoFilme });

  } catch (err) {
    console.error(err);

    // Verifica o tipo de erro e responde adequadamente
    if (err.name === 'SequelizeValidationError') {
      return res.status(400).json({ message: 'Erro ao inserir o filme!', errors: err.errors });
    }

    res.status(500).json({ message: 'Erro no servidor ao inserir o filme!', errors: err.errors });
  }
});

// Rota para atualizar um filme

filmeRouter.put('/filmes/:id', async (req, res) => {
  const idfilme = req.params.id;

  try {
    const filmeAtualizado = await Filme.findByPk(idfilme);

    if (filmeAtualizado) {
      const { titulo, diretor, genero, anoLancamento } = req.body;
      await filmeAtualizado.update({ titulo, diretor, genero, anoLancamento });
      res.json({ message: 'filme atualizado com sucesso!', filmeAtualizado });
    } else {
      res.status(404).json({ message: 'filme não encontrado!' });
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao atualizar o filme!', error: err });
  }
});

// apagar um filme
// DELETE FROM filme WHERE id = 1;

filmeRouter.delete('/filmes/:id', async (req, res) => {
  const idfilme = req.params.id;

  try {
    const filmeDeletado = await Filme.findByPk(idfilme);

    if (filmeDeletado) {
      await filmeDeletado.destroy();
      res.json({ message: 'eu sou inevitavel! *estalo*' });
    } else {
      res.status(404).json({ message: 'filme não encontrado!' });
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao deletar o filme!', error: err });
  }
});