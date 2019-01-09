/**
 * Controller
 * @param app
 */

const JSEncrypt = require('node-jsencrypt');
module.exports = app => {
    return class SignInController extends app.Controller {
        async index(ctx){
            if (ctx.session.uid)
                ctx.redirect("/");
            else
                await ctx.render('shop/red/register');
        }
        async create(ctx) {
            let isRegister=ctx.app.locals.baseConfig.isRegister;
            if (isRegister!='1') {
                ctx.failure("平台已关闭注册，若有需要请联系官方微信!");
                return;
            }
            const {content,nickname,code} = ctx.request.body;
            const jsEncrypt = new JSEncrypt();
            jsEncrypt.setPrivateKey(app.config.private_key);
            let  _content = jsEncrypt.decrypt(content);
            if(!_content){
                ctx.failure("验证失败!");
                return;
            }
            let json=JSON.parse(_content);
            const {username,password}=json;
            if(code!=ctx.session.captcha){
                ctx.failure("验证码错误");
                return;
            }
            let user = await ctx.model.User.findOne({ where:{username}});
            if (user) {
                ctx.failure("用户名已存在!");
                return;
            }
            await ctx.model.User.add(username, password,nickname);
            ctx.success('注册成功!');
        }
    };
};
