/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('wordbook', {
    keyword: {
      type: DataTypes.STRING(30),
      allowNull: false,
      primaryKey: true
    },
    wordValue: {
      type: DataTypes.STRING(30),
      allowNull: false,
      primaryKey: true
    },
    wordDisplay: {
      type: DataTypes.STRING(100),
      allowNull: false
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
    note: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'wordbook'
  });
};
