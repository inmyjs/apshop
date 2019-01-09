/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('subject_goods', {
    logID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    subjectID: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    goodsID: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    tableName: 'subject_goods'
  });
};
