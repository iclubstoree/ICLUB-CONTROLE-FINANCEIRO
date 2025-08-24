const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const dre = sequelize.define(
    'dre',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

receita_bruta: {
        type: DataTypes.DECIMAL,

      },

cmv_cpv: {
        type: DataTypes.DECIMAL,

      },

lucro_bruto: {
        type: DataTypes.DECIMAL,

      },

despesas_operacionais: {
        type: DataTypes.DECIMAL,

      },

resultado_operacional: {
        type: DataTypes.DECIMAL,

      },

outras_receitas: {
        type: DataTypes.DECIMAL,

      },

resultado_liquido: {
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

  dre.associate = (db) => {

    db.dre.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.dre.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return dre;
};

