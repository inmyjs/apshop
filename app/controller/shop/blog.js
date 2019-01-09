/**
 * Controller
 * @param app
 */


module.exports = app => {
    return class BlogController extends app.Controller {
        async index(ctx){
            let data= await ctx.getUserInfo();
            let blogClassID=ctx.query.blogClassID;
            data.active_page=3;
            const shopRecommendGoods = await ctx.model.ShopGoods.findAll({
                where:{recommendFlag:'1',goodsStatus:'U'},
                order:[['sortNo', 'ASC']],
                limit:3
            });
            data.shopRecommendGoods=shopRecommendGoods;
            data.blogClasss=await ctx.model.BlogClass.findAll({
                where:{parentID:0,status:'0'}
            });
            if(blogClassID){
                data.blogs = await ctx.model.Blog.findAll({
                    where:{status:'0',blogClassID},
                    order:[['createTime', 'desc']],
                    limit:6
                });
            }else{
                data.blogs = await ctx.model.Blog.findAll({
                    where:{status:'0'},
                    order:[['createTime', 'desc']],
                    limit:6
                });
            }
            await ctx.render('shop/red/blog-listing', data);
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
        async detail(ctx){
            let data= await ctx.getUserInfo();
            //data.active_page=4;
            const shopRecommendGoods = await ctx.model.ShopGoods.findAll({
                where:{recommendFlag:'1',goodsStatus:'U'},
                order:[['sortNo', 'ASC']],
                limit:3
            });
            data.shopRecommendGoods=shopRecommendGoods;
            data.blogClasss=await ctx.model.BlogClass.findAll({
                where:{parentID:0,status:'0'}
            });
            let blogID=ctx.params.id;
            data.blog=await ctx.model.Blog.findByPk(blogID);
            await ctx.render('shop/red/blog-post', data);
        }
        async get(ctx){
            let {blogClassID}=ctx.query;
            let blogs=await ctx.model.Blog.findAll({
                where:{blogClassID,status:'0'},raw:true
            });
            if(blogs.length>0){
                ctx.success("查询成功",blogs[0]);
            }else{
                ctx.failure("未查询到相关信息");
            }
        }
    };
};
