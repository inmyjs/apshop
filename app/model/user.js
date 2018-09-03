/**
 * 对象
 * @param app
 * @returns {void | *}
 */
//导入加密模块
var bcrypt = require('bcryptjs');
module.exports = app => {
    const User = app.model.import('../domain/user');
    /*User.prototype.logSignin = function* () {
        yield this.update({ last_sign_in_at: new Date() });
    }*/
    User.add=function*(username,pass,nickname) {
        const saltRounds = 10;
        var salt = bcrypt.genSaltSync(saltRounds);
        var password = bcrypt.hashSync(pass, salt);
        const user= yield this.create({
            username,nickname,
            'userType':'C'
        });
        //写入登录表
        const userLogin = yield app.model.UserLogin.create({
            'loginString': username,
            password,
            'uid': user.uid,
            salt
        });
    };
    return User;
};