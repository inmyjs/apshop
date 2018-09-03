/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('email_valid', {
    logID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    validType: {
      type: DataTypes.CHAR(1),
      allowNull: true
    },
    token: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    url: {
      type: DataTypes.STRING(300),
      allowNull: false
    },
    createTime: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    validTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    validStatus: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: 'email_valid'
  });
};
