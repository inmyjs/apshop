/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('shop_goods', {
    goodsID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    storeID: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    subTitle: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    goodsClassID: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    goodsType: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: 'E'
    },
    imgurl: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    priceMarket: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    stock: {
      type: DataTypes.INTEGER(32),
      allowNull: true
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    prop: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    spec: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    param: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    hasSpec: {
      type: DataTypes.INTEGER(1),
      allowNull: true
    },
    unit: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    upAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    downAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    numView: {
      type: DataTypes.INTEGER(32),
      allowNull: true,
      defaultValue: '0'
    },
    numComment: {
      type: DataTypes.INTEGER(32),
      allowNull: true,
      defaultValue: '0'
    },
    numSale: {
      type: DataTypes.INTEGER(32),
      allowNull: true,
      defaultValue: '0'
    },
    numSaleWeek: {
      type: DataTypes.INTEGER(32),
      allowNull: true,
      defaultValue: '0'
    },
    sortNo: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    opBy: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    opAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    recommendFlag: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: '0'
    },
    goodsStatus: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: 'shop_goods'
  });
};
