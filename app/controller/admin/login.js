/**
 * 登录Controller
 * @param app
 */

var bcrypt = require('bcryptjs');
const JSEncrypt = require('node-jsencrypt');
var moment=require('moment');
module.exports = app => {
    return class LoginController extends app.Controller {
        async login(ctx) {
           /* const {content} = ctx.request.body;
            const jsEncrypt = new JSEncrypt();
            jsEncrypt.setPrivateKey(app.config.private_key);
            var _content = jsEncrypt.decrypt(content);
            if (!_content) {
                this.failure("验证失败!");
                return;
            }
            var json = JSON.parse(_content);
            const {username, password} = json;*/
            const {username, password}= ctx.request.body;
            var user = await ctx.model.User.findOne({where: {username}});
            if (!user) {
                this.failure("用户名或密码错误!");
                return;
            }
            if (user.userType!='A') {
                this.failure("非管理员身份禁止登录!");
                return;
            }
            var userLogin = await ctx.model.UserLogin.findOne({where: {loginString: username}});
            if (!userLogin) {
                this.failure("用户登录信息不存在!");
                return;
            }
            var res = bcrypt.compareSync(password, userLogin.password);
            if (res) {
                await ctx.model.UserLoginL.create({uid: user.uid,loginString:username,loginLogType:'L'});
                user.update({
                    loginNum:user.loginNum+1,
                    lastLoginTime:moment()
                });
                this.success("登录成功!",{token:user.uid});
                return;
            } else {
                this.failure("用户名或密码错误!");
                return;
            }
            this.failure("登录失败!");
        }
        async logout(ctx) {
            const {token}= ctx.request.body;
            var user = await ctx.model.User.findOne({where: {uid:token},raw:true});
            if (!user) {
                this.failure("token已失效!");
                return;
            }
            ctx.model.UserLoginL.create({uid:user.uid,loginString:user.username,loginLogType:'Q'});
            this.success("退出成功!");
        }
    };
};