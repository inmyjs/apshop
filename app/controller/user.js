/**
 * Controller
 * @param app
 */

var bcrypt = require('bcryptjs');
const JSEncrypt = require('node-jsencrypt');
module.exports = app => {
    return class UserController extends app.Controller {
        async index(ctx){
            console.log(ctx.session.uid);
        }
        async updatePassword(ctx){
            const {content} = ctx.request.body;
            const jsEncrypt = new JSEncrypt();
            jsEncrypt.setPrivateKey(app.config.private_key);
            var _content = jsEncrypt.decrypt(content);
            if (!_content) {
                this.failure("验证失败!");
                return;
            }
            var json = JSON.parse(_content);
            const {oldPassword, newPassword} = json;
            var userLogin = await ctx.model.UserLogin.findById(ctx.session.username);
            if (!userLogin) {
                this.failure("修改失败!");
                return;
            }
            var res = bcrypt.compareSync(oldPassword, userLogin.password);
            if (res) {
                const saltRounds = 10;
                var salt = bcrypt.genSaltSync(saltRounds);
                var password = bcrypt.hashSync(newPassword, salt);
                userLogin.update({password,salt});
                ctx.session = null;
                this.success("修改成功!");
                return;
            }else {
                this.failure("原密码错误!");
                return;
            }
        }
    };
};