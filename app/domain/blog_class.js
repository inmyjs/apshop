/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('blog_class', {
    blogClassID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    blogType: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: '0'
    },
    parentId: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    isLeaf: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      defaultValue: '0'
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
    }
  }, {
    tableName: 'blog_class'
  });
};
