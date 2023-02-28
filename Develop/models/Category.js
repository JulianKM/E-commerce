const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Category extends Model {}

Category.init({
    // define columns
    ategory_name: {
      type: DataTypes.STRING,
      allowNull:false,
      unique:true,
      validate:{
          isAlpha:true
  },
},
},
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);

module.exports = Category;
