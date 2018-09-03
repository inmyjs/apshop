/**
 *  主页Controller
 * @param app
 * @returns {OrderController}
 */

module.exports = app => {
    return class WishListController extends app.Controller {

        async index(ctx){
            var data= await this.getUserInfo();
            data.active_page=3;
            await this.ctx.render('shop/template/'+app.config.viewTemplate+'/contact', data);
        }
        async create(ctx){
            const {name,email,title,content} = ctx.request.body;
            var uid=ctx.session.uid;
            await ctx.model.GuestMessage.create({
                uid,name,email,title,content
            });
            return this.success("添加成功!");
        }
        async dz(ctx){
            var data= await this.getUserInfo();
            const shopRecommendGoods = await ctx.model.ShopGoods.findAll({
                where:{recommendFlag:'1',goodsStatus:'U'},
                order:[['sortNo', 'ASC']]
            });
            data.shopRecommendGoods=shopRecommendGoods;
            data.active_page=2;
            data.blogClasss=await ctx.model.BlogClass.findAll({
                where:{blogType:'D',status:'0',parentId:0}
            });
            await this.ctx.render('shop/template/'+app.config.viewTemplate+'/dz', data);
        }
    };
};