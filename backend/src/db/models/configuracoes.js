const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const configuracoes = sequelize.define(
    'configuracoes',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

dias_proximas: {
        type: DataTypes.INTEGER,

      },

itens_por_pagina: {
        type: DataTypes.INTEGER,

      },

ordenacao_data: {
        type: DataTypes.ENUM,

        values: [

"ascendente",

"descendente"

        ],

      },

moeda: {
        type: DataTypes.ENUM,

        values: [

"BRL"

        ],

      },

formato_data: {
        type: DataTypes.ENUM,

        values: [

"AAAA-MM-DD"

        ],

      },

idioma: {
        type: DataTypes.ENUM,

        values: [

"pt-BR"

        ],

      },

fuso: {
        type: DataTypes.ENUM,

        values: [

"America/Belem"

        ],

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

  configuracoes.associate = (db) => {

    db.configuracoes.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.configuracoes.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return configuracoes;
};

