/**
 *  主页Controller
 * @param app
 * @returns {HomeController}
 */
module.exports = app => {
    return class HomeController extends app.Controller {
        async index(ctx){
            await ctx.render('admin/index');
        }
    };
};