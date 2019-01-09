/**
 * Controller
 * @param app
 */


module.exports = app => {
    return class SubjectController extends app.Controller {
        async index(ctx){
            let data= await ctx.getUserInfo();
            data.active_page=4;
            const shopRecommendGoods = await ctx.model.ShopGoods.findAll({
                where:{recommendFlag:'1',goodsStatus:'U'},
                order:[['sortNo', 'ASC']],
                limit:3
            });
            data.shopRecommendGoods=shopRecommendGoods;
            let {blogType}=ctx.query;
            data.blogClasss=await ctx.model.BlogClass.findAll({
                where:{blogType,status:'0'}
            });
            await ctx.render('shop/red/blog-listing', data);
        }
        async show(ctx){
            let subjectID=ctx.params.id;
            let data= await ctx.getUserInfo();
            data.subject=await ctx.model.Subject.findByPk(subjectID);
            let subjectGoods = await ctx.model.query(`SELECT * FROM shop_goods where goodsID in (SELECT goodsID FROM subject_goods where subjectID=${subjectID}) and goodsStatus='U' order by opAt desc`,
                {
                    type: ctx.model.QueryTypes.SELECT,
                    model:ctx.model.shopGoods
                });
            data.subjectGoods=subjectGoods;
            await ctx.render('shop/red/subject-post', data);
        }

    };
};
