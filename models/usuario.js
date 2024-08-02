import { connection } from '../config/database.js';
import { DataTypes } from 'sequelize';
import { Endereco } from './endereco.js';
import { Filme } from './filme.js';
import { usuarioFilme } from './usuarioFilme.js';

export const Usuario = connection.define('usuario', {
  nome: {
    type: DataTypes.STRING(130),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Usuario.hasOne(Endereco, {
  foreignKey: {
    name: 'usuarioId',
    allowNull: false,
  },
  onDelete: 'CASCADE',
});
Endereco.belongsTo(Usuario, {
  foreignKey: 'usuarioId',
  onDelete: 'CASCADE',
});

Usuario.belongsToMany(Filme, { through: 'usuario_filme', as: 'Filmes' }); // para associação de N:N
Filme.belongsToMany(Usuario, { through: 'usuario_filme', as: 'Usuarios' });
