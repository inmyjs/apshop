/**
 * Controller
 * @param app
 */


module.exports = app => {
    return class UserController extends app.Controller {
        async index(ctx){
            var data= await this.getUserInfo();
            data.active_page=4;
            const shopRecommendGoods = await ctx.model.ShopGoods.findAll({
                where:{recommendFlag:'1',goodsStatus:'U'},
                order:[['sortNo', 'ASC']]
            });
            data.shopRecommendGoods=shopRecommendGoods;
            var {blogType}=ctx.query;
            data.blogClasss=await ctx.model.BlogClass.findAll({
                where:{blogType,status:'0'}
            });
            await ctx.render('shop/template/'+app.config.viewTemplate+'/blog-listing', data);
        }
        async list(ctx){
            var {blogClassID,page,limit}=ctx.query;
            limit=Number(limit);
            var offset=(Number(page)-1)*limit;
            const result=await ctx.model.Blog.findAndCountAll({
                where:{blogClassID},offset,limit,raw:true
            });
            this.success("查询成功",result.rows,result.count);
        }
        async detail(ctx){
            var data= await this.getUserInfo();
            //data.active_page=4;
            const shopRecommendGoods = await ctx.model.ShopGoods.findAll({
                where:{recommendFlag:'1',goodsStatus:'U'},
                order:[['sortNo', 'ASC']]
            });
            data.shopRecommendGoods=shopRecommendGoods;
            var {blogType}=ctx.query;
            data.blogClasss=await ctx.model.BlogClass.findAll({
                where:{blogType,status:'0',parentId:0}
            });
            await ctx.render('shop/template/'+app.config.viewTemplate+'/blog-post', data);
        }
        async get(ctx){
            var {blogClassID}=ctx.query;
            var blogs=await ctx.model.Blog.findAll({
                where:{blogClassID,status:'0'},raw:true
            });
            if(blogs.length>0){
                this.success("查询成功",blogs[0]);
            }else{
                this.failure("未查询到相关信息");
            }
        }
    };
};