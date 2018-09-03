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
      type: DataTypes.TEXT,
      allowNull: true
    },
    docType: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: 'D'
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
