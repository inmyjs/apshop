/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('document', {
    did: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    docUrl: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    docType: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    docName: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    create_Time: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'document'
  });
};
