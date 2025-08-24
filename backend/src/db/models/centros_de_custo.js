const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const centros_de_custo = sequelize.define(
    'centros_de_custo',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

nome: {
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

  centros_de_custo.associate = (db) => {

    db.centros_de_custo.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.centros_de_custo.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return centros_de_custo;
};

