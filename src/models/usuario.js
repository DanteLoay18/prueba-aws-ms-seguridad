const { Model,DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');

class Usuario extends Model {}

Usuario.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    usuario: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    clave: {
      type: DataTypes.STRING(80),
      allowNull: false,
    },
    tipo_usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true
      }
    },
    locales: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: false,
    },
    estado: {
      type: DataTypes.BOOLEAN,
    },
    pin: {
      type: DataTypes.STRING(10),
      validate: {
        isNumeric: true
      },
      allowNull: false,
    },
    restaurante_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    user_id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true
      }
    }
   
  },
  {
    sequelize: sequelize,
    modelName: "usuario",
    tableName: "usuario",
    timestamps: false,
    defaultScope: {
      order: [['id', 'ASC']]
    }
  }
);




module.exports = Usuario;