/**
 *  主页Controller
 * @param app
 * @returns {HomeController}
 */
module.exports = app => {
    return class HomeController extends app.Controller {
        async index(ctx){
            let data= await ctx.getUserInfo();
            let shopRecommendGoods = await ctx.model.ShopGoods.findAll({
                where:{recommendFlag:'1',goodsStatus:'U'},
                order:[['sortNo', 'ASC']],
            });
            data.shopRecommendGoods=shopRecommendGoods;
            let subjects = await ctx.model.Subject.findAll({
                where:{status:'0'},
                order:[['createTime', 'desc']],
                limit:3
            });
            let blogs = await ctx.model.Blog.findAll({
                where:{status:'0'},
                order:[['createTime', 'desc']],
                limit:3
            });
            data.subjects=subjects;
            data.blogs=blogs;
            data.active_page=1;
            await this.ctx.render('shop/red/index', data);
        }
    };
};
