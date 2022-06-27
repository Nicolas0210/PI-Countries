const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('touristActivity', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
    name: {
        type: DataTypes.STRING
    },
    dificulty: {
        type: DataTypes.INTEGER
    },
    duration: {
        type: DataTypes.FLOAT
    },
    season: {
        type: DataTypes.ENUM("summer", "fall", "winter", "spring")
    }
  }, {timestamps: false});
};