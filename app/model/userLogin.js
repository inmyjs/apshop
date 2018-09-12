/**
 * Model
 * @param app
 * @returns {*}
 */
var bcrypt = require('bcryptjs');
module.exports = app => {
    const UserLogin = app.model.import('../domain/userlogin');
    UserLogin.updatePassword=async function(username,pass) {
        const saltRounds = 10;
        var salt = bcrypt.genSaltSync(saltRounds);
        var password = bcrypt.hashSync(pass, salt);
        const userLogin=await this.findOne({where:{loginString:username}});
        if(!userLogin){
            return null;
        }
        userLogin.update({password, salt});
        return userLogin;
    };
    return UserLogin;
};