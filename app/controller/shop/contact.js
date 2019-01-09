/**
 *  主页Controller
 * @param app
 * @returns {OrderController}
 */

module.exports = app => {
    return class WishListController extends app.Controller {

        async index(ctx){
            let data= await ctx.getUserInfo();
            data.active_page=4;
            await this.ctx.render('shop/red/contact', data);
        }
        async create(ctx){
            const {name,tell,title,content,code} = ctx.request.body;
            let uid=ctx.session.uid;
            if(code!=ctx.session.captcha){
                ctx.failure("验证码错误");
                return;
            }
            await ctx.model.GuestMessage.create({
                uid,name,tell,title,content
            });
            return ctx.success("发送成功,我们会尽快跟您联系！");
        }
    };
};
