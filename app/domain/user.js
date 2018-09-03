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
    emall: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    cell2: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    tel: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    fax: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    qq: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    weChat: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    nationality: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    religion: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    polityFace: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    birthdate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    birthPlace: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    marriage: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: '0'
    },
    blood: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: '0'
    },
    gender: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: '0'
    },
    height: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    weight: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    education: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: '0'
    },
    gradSchool: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    major: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    graduationDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    occupation: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    jobTitle: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    regionID: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    provinceID: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    cityID: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    districtID: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    town: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    addr1: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    addr2: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    addr3: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    zip: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    URGLinkman: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    URGTel: {
      type: DataTypes.STRING(30),
      allowNull: true
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
      allowNull: true
    },
    lastLoginTime: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'user'
  });
};
