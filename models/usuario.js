import { connection } from '../config/database.js';
import { DataTypes } from 'sequelize';
import { Endereco } from './endereco.js';
import { Filme } from './filme.js';

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

Usuario.hasOne(Endereco);
Endereco.belongsTo(Usuario);

Usuario.belongsToMany(Filme, { through: 'usuario_filme' });
Filme.belongsToMany(Usuario, { through: 'usuario_filme' });
