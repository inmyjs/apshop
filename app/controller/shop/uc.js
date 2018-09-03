/**
 *  主页Controller
 * @param app
 * @returns {HomeController}
 */
module.exports = app => {
    return class UCController extends app.Controller {
        async index(ctx){
            var data=await this.getUserInfo();

            await ctx.render('shop/template/'+app.config.viewTemplate+'/account',data);
        }
    };
};