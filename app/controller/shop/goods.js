/**
 *  主页Controller
 * @param app
 * @returns {GoodsController}
 */
module.exports = app => {
    return class GoodsController extends app.Controller {
        async show(ctx){
            var data=await this.getUserInfo();
            const goods = await ctx.model.ShopGoods.findById(ctx.params.id);
            if(!goods){
                ctx.throw(404);
                return;
            }
            data.goods=goods;
            const goodsImages = await ctx.model.ShopGoodsImages.findAll({
                where:{goodsID:goods.goodsID},
                order:[['sortNo', 'ASC']]
            });
            data.goodsImages=goodsImages;
            const shopRecommendGoods = await ctx.model.ShopGoods.findAll({
                where:{recommendFlag:'1',goodsStatus:'U'},
                order:[['sortNo', 'ASC']]
            });
            data.shopRecommendGoods=shopRecommendGoods;
            await this.ctx.render('shop/template/'+app.config.viewTemplate+'/product-detail', data);
        }
        async get(ctx){
            var data=await this.getUserInfo();
            var search=ctx.query.search;
            const Op = ctx.model.Op;
            const shopGoods = await ctx.model.ShopGoods.findAll({
                where:{
                    [Op.or]:[{name:{[Op.like]: `%${search}%`}},{title:{[Op.like]: `%${search}%`}}]
                }
            });
            data.shopGoods=shopGoods;
            const shopHotGoods = await ctx.model.query("SELECT async FROM `shop_goods` where goodsID in (SELECT goodsID FROM shop_hot_goods)", { type: ctx.model.QueryTypes.SELECT});
            data.shopHotGoods=shopHotGoods;
            await this.ctx.render('shop/template/'+app.config.viewTemplate+'/search', data);
        }
        async myProduct(ctx){
            var data=await this.getUserInfo();
            const goods = await ctx.model.ShopUserGoods.findAll({where:{uid:ctx.session.uid}});
            data.goods=goods;
            await this.ctx.render('shop/template/'+app.config.viewTemplate+'/my-product', data);
        }
    };
};