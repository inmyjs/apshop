/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('region', {
    region_id: {
      type: DataTypes.INTEGER(5).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    parent_id: {
      type: DataTypes.INTEGER(5).UNSIGNED,
      allowNull: false,
      defaultValue: '0'
    },
    region_name: {
      type: DataTypes.STRING(120),
      allowNull: false,
      defaultValue: ''
    },
    region_type: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '2'
    },
    agency_id: {
      type: DataTypes.INTEGER(5).UNSIGNED,
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: 'region'
  });
};
