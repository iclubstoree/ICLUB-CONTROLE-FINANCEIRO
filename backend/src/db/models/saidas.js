const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const saidas = sequelize.define(
    'saidas',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

data: {
        type: DataTypes.DATE,

      },

loja: {
        type: DataTypes.TEXT,

      },

categoria: {
        type: DataTypes.TEXT,

      },

centro_de_custo: {
        type: DataTypes.TEXT,

      },

tipo: {
        type: DataTypes.TEXT,

      },

descricao: {
        type: DataTypes.TEXT,

      },

value: {
        type: DataTypes.DECIMAL,

      },

pago: {
        type: DataTypes.ENUM,

        values: [

"sim",

"nao"

        ],

      },

recorrencia: {
        type: DataTypes.ENUM,

        values: [

"sim",

"nao"

        ],

      },

observacoes: {
        type: DataTypes.TEXT,

      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  saidas.associate = (db) => {

    db.saidas.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.saidas.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return saidas;
};

