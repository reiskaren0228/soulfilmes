import { connection } from '../config/database.js';
import { DataTypes } from 'sequelize';

export const Filme = connection.define('filme', {
  titulo: {
    type: DataTypes.STRING(130),
    allowNull: false,
  },
  diretor: {
    type: DataTypes.STRING(130),
    allowNull: false,
  },
  genero: {
    type: DataTypes.STRING(130),
    allowNull: false,
  },
  anoLancamento: {
    type: DataTypes.STRING(4),
    allowNull: false,
  },
});