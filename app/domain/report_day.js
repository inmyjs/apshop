/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('report_day', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    reportDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    reportType: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    data: {
      type: DataTypes.STRING(20),
      allowNull: false
    }
  }, {
    tableName: 'report_day'
  });
};
