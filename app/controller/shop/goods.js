/**
 *  主页Controller
 * @param app
 * @returns {GoodsController}
 */
module.exports = app => {
    return class GoodsController extends app.Controller {
        async index(ctx){
            let data= await ctx.getUserInfo();
            let goodsClassID=ctx.query.goodsClassID;
            data.active_page=2;
            const shopRecommendGoods = await ctx.model.ShopGoods.findAll({
                where:{recommendFlag:'1',goodsStatus:'U'},
                order:[['sortNo', 'ASC']],
                limit:3
            });
            data.shopRecommendGoods=shopRecommendGoods;

            if(goodsClassID){
                data.shopGoods = await ctx.model.ShopGoods.findAll({
                    where:{recommendFlag:'0',goodsStatus:'U',goodsClassID},
                    order:[['sortNo', 'ASC']],
                    limit:9
                });
            }else{
                data.shopGoods = await ctx.model.ShopGoods.findAll({
                    where:{recommendFlag:'0',goodsStatus:'U'},
                    order:[['sortNo', 'ASC']],
                    limit:9
                });
            }
            data.goodsClass=await ctx.model.ShopGoodsClass.findAll({
                where:{status:'0',parentID:0}
            });
            await ctx.render('shop/red/goods-listing', data);
        }
        async show(ctx){
            let data=await ctx.getUserInfo();
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
                order:[['sortNo', 'ASC']],
                limit:3
            });
            data.shopRecommendGoods=shopRecommendGoods;
            await this.ctx.render('shop/red/product-detail', data);
        }
        async get(ctx){
            let data=await ctx.getUserInfo();
            let search=ctx.query.search;
            const Op = ctx.model.Op;
            const shopGoods = await ctx.model.ShopGoods.findAll({
                where:{
                    [Op.or]:[{name:{[Op.like]: `%${search}%`}},{title:{[Op.like]: `%${search}%`}}]
                }
            });
            data.shopGoods=shopGoods;
            //const shopHotGoods = await ctx.model.query("SELECT * FROM `shop_goods` where goodsID in (SELECT goodsID FROM shop_hot_goods)", { type: ctx.model.QueryTypes.SELECT});
            const shopRecommendGoods = await ctx.model.ShopGoods.findAll({
                where:{recommendFlag:'1',goodsStatus:'U'},
                order:[['sortNo', 'ASC']],
                limit:3
            });
            data.shopHotGoods=shopRecommendGoods;
            await this.ctx.render('shop/red/search', data);
        }
        async myProduct(ctx){
            let data=await ctx.getUserInfo();
            const goods = await ctx.model.ShopUserGoods.findAll({where:{uid:ctx.session.uid}});
            data.goods=goods;
            await this.ctx.render('shop/red/my-product', data);
        }
    };
};
