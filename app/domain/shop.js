/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('shop', {
    shopID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    sender: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    shopName: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    shopTitle: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    shopDescribe: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    shopKeyWord: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    location: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    completeAddress: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    serviceQQ: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    serviceEmail: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    serviceCall: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    shopLogo: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    wxImg: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    status: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: 'shop'
  });
};
