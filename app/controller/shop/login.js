/**
 * 登录Controller
 * @param app
 */
const ms = require('ms');
var bcrypt = require('bcryptjs');
const JSEncrypt = require('node-jsencrypt');
var moment=require('moment');
module.exports = app => {
    return class LoginController extends app.Controller {
        async index(ctx){
            if (ctx.session.uid)
                ctx.redirect("/");
            else
                await ctx.render('shop/template/'+app.config.viewTemplate+'/login');
        }
        async forget(ctx){
            if (ctx.session.uid)
                ctx.redirect("/");
            else
                await ctx.render('shop/template/'+app.config.viewTemplate+'/forget');
        }
        async login(ctx) {
            const {content} = ctx.request.body;
            const jsEncrypt = new JSEncrypt();
            jsEncrypt.setPrivateKey(app.config.private_key);
            var _content = jsEncrypt.decrypt(content);
            if (!_content) {
                this.failure("验证失败!");
                return;
            }
            var json = JSON.parse(_content);
            const {username, password, rememberMe} = json;
            var user = await ctx.model.User.findOne({where: {username}});
            if (!user) {
                this.failure("用户名或密码错误!");
                return;
            }
            if (user.status=='C') {
                this.failure("该用户已禁止登录!");
                return;
            }
            var userLogin = await ctx.model.UserLogin.findOne({where: {loginString: username}});
            if (!userLogin) {
                this.failure("用户登录信息不存在!");
                return;
            }
            var res = bcrypt.compareSync(password, userLogin.password);
            if (res) {
                ctx.session.uid=user.uid;
                ctx.session.username=username;
                ctx.session.nickname=user.nickname;
                //ctx.session.visited = ctx.session.visited ? ctx.session.visited++ : 1;
                if (rememberMe) ctx.session.maxAge = ms('7d');
                else ctx.session.maxAge = ms('2h');
                // 调用 rotateCsrfSecret 刷新用户的 CSRF token
                ctx.rotateCsrfSecret();
                await ctx.model.UserLoginL.create({uid: user.uid,loginString:username,loginLogType:'L'});
                user.update({
                    loginNum:user.loginNum+1,
                    lastLoginTime:moment()
                });
                this.success("登录成功!");
                return;
            } else {
                this.failure("用户名或密码错误!");
                return;
            }
            this.failure("登录失败!");
        }
        async logout(ctx) {
            var uid=ctx.session.uid;
            var username=ctx.session.username;
            ctx.session = null;
            await ctx.model.UserLoginL.create({uid,loginString:username,loginLogType:'Q'});
            this.success("退出成功!");
        }
    };
};