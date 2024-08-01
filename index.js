import { connection, authenticate } from './config/database.js';
import { Usuario } from './models/usuario.js';
import { Endereco } from './models/endereco.js';
import { Filme } from './models/filme.js';


authenticate(connection).then(() => {
  // apos conectar no banco de dados, sincroniza os modelos. gera as tabelas se necessario
  // force: true força a criação da tabela, apagando a tabela se ela existir
  // recomendado apenas no desenvolvimento
  connection.sync({ force: true });
  // connection.sync();
});

// chave primaria da tabela usuario_filme junçao do id filme e usuario