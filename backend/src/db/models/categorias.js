const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const categorias = sequelize.define(
    'categorias',
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

  categorias.associate = (db) => {

    db.categorias.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.categorias.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return categorias;
};

