/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('blog', {
    blogID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    blogClassID: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    title: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    subTitle: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    about: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    coverImg: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: '0'
    },
    createTime: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'blog'
  });
};
