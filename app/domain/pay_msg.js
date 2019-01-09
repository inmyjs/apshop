/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pay_msg', {
    logID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    msgType: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    memo: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    description: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    tradeNo: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    username: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    raw: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    payTime: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'pay_msg'
  });
};
