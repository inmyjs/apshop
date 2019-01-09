/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('shop_payment', {
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
    payType: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: '0'
    },
    opBy: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    payCode: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    payDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    uid: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    paidAmount: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    billStatus: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: 'P'
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    createTime: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'shop_payment'
  });
};
