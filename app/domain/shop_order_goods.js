/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('shop_order_goods', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    billNo: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    goodsID: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    goodsType: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: 'E'
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
    tableName: 'shop_order_goods'
  });
};
