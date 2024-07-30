import { connection } from '../config/database.js';
import { DataTypes } from 'sequelize';

export const Endereco = connection.define('endereco', {
  uf: {
    type: DataTypes.STRING(2),
    allowNull: false,
  },
  cidade: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  cep: {
    type: DataTypes.STRING(8),
    allowNull: false,
  },
  rua: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  numero: {
    type: DataTypes.STRING,
    defaultValue: 'S/N',
  },
  pagamento: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});
