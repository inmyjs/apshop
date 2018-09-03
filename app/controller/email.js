/**
 * Controller
 * @param app
 */

var moment = require('moment');
module.exports = app => {
    return class EmailController extends app.Controller {
        async send(ctx){
            const {email,act,code} = ctx.request.body;
            if(code!=ctx.session.captcha){
                this.failure("验证码错误");
                return;
            }
            const user=await ctx.model.User.findOne({where:{username:email}});
            if(!user){
                this.failure("该邮件未注册过");
                return;
            }
            var validTime=moment().add(2, 'h');
            var server=ctx.app.config.server;
            var json=[email,validTime.format('X')];
            var token=ctx.helper.cryptoStr(json.join(","));
            var url=`${server}/email/valid?act=forget&email=${email}&token=${token}`;
            switch (act){
                case "register":
                    await ctx.model.EmailValid.create({
                        email,validType:"R",token,url,validTime
                    });
                    ctx.helper.sendValidate({
                        to: email,
                        title: '欢迎注册天启皮肤商城',
                        href: url,
                        success:function () {

                        }
                    });
                    this.success("邮件发送成功");
                    break;
                case "forget":
                    await ctx.model.EmailValid.create({
                        email,validType:"F",token,url,validTime
                    });
                    ctx.helper.sendValidate({
                        to: email,
                        title: '天启皮肤商城邮箱验证',
                        href: url,
                        success:function () {

                        }
                    });
                    this.success("邮件发送成功");
                    break;
                default:
                    console.log("default");
            }
        }
        async valid(ctx){
            const {email,act,token} = ctx.query;
            var json=ctx.helper.decryptoStr(token).split(",");
            console.log(json);
            if(email!=json[0]||moment().format('X')>json[1]){
                ctx.throw(403);
                return;
            }
            var emailValid=await ctx.model.EmailValid.findOne({where:{token}});
            if(!emailValid){
                ctx.throw(404);
                return;
            }
            if(emailValid.validStatus=="S"||emailValid.validStatus=="C"){
                ctx.throw(404);
                return;
            }else if(moment().isAfter(emailValid.validTime)){
                emailValid.update({validStatus:"C"});
                ctx.throw(404);
                return;
            }
            switch (act){
                case "register":
                    break;
                case "forget":
                    await ctx.render('shop/template/'+app.config.viewTemplate+'/forget',{valid:true,email,token});
                    break;
                default:
                    console.log("default");
            }
        }
    };
};