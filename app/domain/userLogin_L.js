/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('userLogin_L', {
    logID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    uid: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    loginString: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    loginLogType: {
      type: DataTypes.CHAR(1),
      allowNull: true
    },
    logDESC: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    createTime: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'userLogin_L'
  });
};
