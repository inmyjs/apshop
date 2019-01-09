/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('shop_user_wishlist', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    uid: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    goodsID: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    goodsType: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: 'E'
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    imgurl: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    createTime: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'shop_user_wishlist'
  });
};
