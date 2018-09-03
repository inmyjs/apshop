/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('shop_hot_goods', {
    goodsID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    imgurl: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    sortNo: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: 'shop_hot_goods'
  });
};
