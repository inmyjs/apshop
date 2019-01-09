/**
 *  主页Controller
 * @param app
 * @returns {HomeController}
 */
const Controller = require('egg').Controller;
class HomeController extends Controller {
    async index(ctx){
        if(ctx.isMobile())
            ctx.redirect('/wap');
        else
            ctx.redirect('/shop');
    }
    async notFound(ctx){
        await ctx.render('404');
    }
}
module.exports = HomeController;