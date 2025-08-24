const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const tipos = sequelize.define(
    'tipos',
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

  tipos.associate = (db) => {

    db.tipos.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.tipos.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return tipos;
};

