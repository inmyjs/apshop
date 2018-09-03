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
                await ctx.render('shop/template/'+app.config.viewTemplate+'/register');
        }
        async create(ctx) {
            const {content,nickname,code} = ctx.request.body;
            const jsEncrypt = new JSEncrypt();
            jsEncrypt.setPrivateKey(app.config.private_key);
            var  _content = jsEncrypt.decrypt(content);
            if(!_content){
                this.failure("验证失败!");
                return;
            }
            var json=JSON.parse(_content);
            const {username,password}=json;
            if(code!=ctx.session.captcha){
                this.failure("验证码错误");
                return;
            }
            var user = await ctx.model.User.findOne({ where:{username}});
            if (user) {
                this.failure("用户名已存在!");
                return;
            }
            await ctx.model.User.add(username, password,nickname);
            this.success('注册成功!');
        }
    };
};