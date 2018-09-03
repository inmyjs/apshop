/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('shop_goodsclass', {
    goodsClassID: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true
    },
    parentId: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    isLeaf: {
      type: DataTypes.CHAR(1),
      allowNull: true
    },
    sortNo: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    status: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: '0'
    },
    delFlag: {
      type: DataTypes.INTEGER(1),
      allowNull: true
    }
  }, {
    tableName: 'shop_goodsclass'
  });
};
