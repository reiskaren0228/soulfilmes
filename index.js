import { connection, authenticate } from './config/database.js';
import { usuarioRouter } from './routes/usuarios.js';
import { filmeRouter } from './routes/filmes.js';
import express from 'express';
import cors from 'cors';
authenticate(connection).then(() => {
  // apos conectar no banco de dados, sincroniza os modelos. gera as tabelas se necessario
  // force: true força a criação da tabela, apagando a tabela se ela existir
  // recomendado apenas no desenvolvimento
  // connection.sync({ force: true });
  connection.sync();
});

const app = express(); // cria uma instância do express

app.use(express.json()); // middleware para o express entender JSON
app.use(cors()); // middleware para permitir requisições de outros domínios

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