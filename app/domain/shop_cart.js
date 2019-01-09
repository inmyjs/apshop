/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('shop_cart', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    uid: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    goodsID: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    goodsType: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: 'E'
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    num: {
      type: DataTypes.INTEGER(32),
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    imgurl: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'shop_cart'
  });
};
