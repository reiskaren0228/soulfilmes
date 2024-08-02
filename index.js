import { connection, authenticate } from './config/database.js';
import { usuarioRouter } from './routes/usuario.js';
import { filmeRouter } from './routes/filme.js';
import express from 'express';
authenticate(connection).then(() => {
  // apos conectar no banco de dados, sincroniza os modelos. gera as tabelas se necessario
  // force: true força a criação da tabela, apagando a tabela se ela existir
  // recomendado apenas no desenvolvimento
  // connection.sync({ force: true });
  connection.sync();
});

const app = express(); // cria uma instância do express

app.use(express.json()); // middleware para o express entender JSON

// rota para a raiz da aplicação
app.get('/', (req, res) => {
  res.send('API de locadora de filmes');
});

// rota para o recurso /usuario e /filme
app.use(usuarioRouter);
app.use(filmeRouter);

app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001 em http://localhost:3001');
});
// chave primaria da tabela usuario_filme junçao do id filme e usuario