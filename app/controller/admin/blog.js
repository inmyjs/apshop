/**
 * Controller
 * @param app
 */


module.exports = app => {
    return class BlogController extends app.Controller {
        async create(ctx){
            let data= await this.getUserInfo();
            data.active_page=4;
            const shopRecommendGoods = await ctx.model.ShopGoods.findAll({
                where:{recommendFlag:'1',goodsStatus:'U'},
                order:[['sortNo', 'ASC']]
            });
            data.shopRecommendGoods=shopRecommendGoods;
            let {blogType}=ctx.query;
            data.blogClasss=await ctx.model.BlogClass.findAll({
                where:{blogType,status:'0'}
            });
            await ctx.render('shop/template/'+app.config.viewTemplate+'/blog-listing', data);
        }
        async list(ctx){
            let {blogClassID,page,limit}=ctx.query;
            limit=Number(limit);
            let offset=(Number(page)-1)*limit;
            const result=await ctx.model.Blog.findAndCountAll({
                where:{blogClassID},offset,limit,raw:true
            });
            ctx.success("查询成功",result.rows,result.count);
        }
    };
};