/**
 * 登录Controller
 * @param app
 */
const ms = require('ms');
let bcrypt = require('bcryptjs');
const JSEncrypt = require('node-jsencrypt');
let moment=require('moment');
module.exports = app => {
    return class LoginController extends app.Controller {
        async index(ctx){
            if (ctx.session.uid)
                ctx.redirect("/");
            else
                await ctx.render('shop/red/login');
        }
        async forget(ctx){
            if (ctx.session.uid)
                ctx.redirect("/");
            else
                await ctx.render('shop/red/forget');
        }
        async login(ctx) {
            const {content} = ctx.request.body;
            const jsEncrypt = new JSEncrypt();
            jsEncrypt.setPrivateKey(app.config.private_key);
            let _content = jsEncrypt.decrypt(content);
            if (!_content) {
                ctx.failure("验证失败!");
                return;
            }
            let json = JSON.parse(_content);
            const {username, password, rememberMe} = json;
            let user = await ctx.model.User.findOne({where: {username}});
            if (!user) {
                ctx.failure("用户名或密码错误!");
                return;
            }
            if (user.status=='C') {
                ctx.failure("该用户已禁止登录!");
                return;
            }
            let userLogin = await ctx.model.UserLogin.findOne({where: {loginString: username}});
            if (!userLogin) {
                ctx.failure("用户登录信息不存在!");
                return;
            }
            let res = bcrypt.compareSync(password, userLogin.password);
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
                ctx.success("登录成功!");
                return;
            } else {
                ctx.failure("用户名或密码错误!");
                return;
            }
            ctx.failure("登录失败!");
        }
        async logout(ctx) {
            let uid=ctx.session.uid;
            if(!uid){
                ctx.success("退出成功!");
            }
            let username=ctx.session.username;
            ctx.session = null;
            await ctx.model.UserLoginL.create({uid,loginString:username,loginLogType:'Q'});
            ctx.success("退出成功!");
        }
    };
};
