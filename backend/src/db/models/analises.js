const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const analises = sequelize.define(
    'analises',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

total_saidas: {
        type: DataTypes.DECIMAL,

      },

quantidade_lancamentos: {
        type: DataTypes.INTEGER,

      },

ticket_medio: {
        type: DataTypes.DECIMAL,

      },

percentual_recorrentes: {
        type: DataTypes.DECIMAL,

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

  analises.associate = (db) => {

    db.analises.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.analises.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return analises;
};

