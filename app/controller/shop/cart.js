/**
 *  主页Controller
 * @param app
 * @returns {CartController}
 */
module.exports = app => {
    return class CartController extends app.Controller {
        async show(ctx){
            let data= await ctx.getUserInfo();
            await ctx.render('shop/red/cart',data);
        }
        async del(ctx){
            const cart = await ctx.model.ShopCart.findById(ctx.params.id);
            cart.destroy();
            ctx.success("删除成功!");
        }
        async create(ctx) {
            const {goodsID,num,price} = ctx.request.body;
            let uid=ctx.session.uid;
            const goods=await ctx.model.ShopGoods.findById(goodsID);
            const cart=await ctx.model.ShopCart.findOrCreate({
                where: {goodsID,uid},
                defaults:{uid,goodsID,name:goods.name,num,price,imgurl:goods.imgurl,goodsType:goods.goodsType}
            });
            return ctx.success("添加成功!",cart);
        }
    };
};