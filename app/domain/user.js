/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    uid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true
    },
    nickname: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    avatar: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    userType: {
      type: DataTypes.CHAR(1),
      allowNull: false
    },
    IDType: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      defaultValue: '0'
    },
    IDNO: {
      type: DataTypes.STRING(30),
      allowNull: true,
      unique: true
    },
    cell: {
      type: DataTypes.STRING(30),
      allowNull: true,
      unique: true
    },
    secQuestion1: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    secQuestion2: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    secQuestion3: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    secAnswer1: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    secAnswer2: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    secAnswer3: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    secPassword: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    status: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: '0'
    },
    validStatus: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: '0'
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    createTime: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    modifyTime: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    closeDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    loginNum: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    lastLoginTime: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'user'
  });
};
