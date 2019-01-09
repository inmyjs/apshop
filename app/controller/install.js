/**
 * Controller
 * @param app
 */
const Controller = require('egg').Controller;
class InstallController extends Controller {
    async index(ctx){
        await ctx.render('install/index');
    }
}
module.exports = InstallController;