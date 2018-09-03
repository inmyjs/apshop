/**
 *  主页Controller
 * @param app
 * @returns {CartController}
 */
module.exports = app => {
    return class CartController extends app.Controller {
        async show(ctx){
            var data= await this.getUserInfo();
            await ctx.render('shop/template/'+app.config.viewTemplate+'/cart',data);
        }
        async del(ctx){
            const cart = await ctx.model.ShopCart.findById(ctx.params.id);
            cart.destroy();
            this.success("删除成功!");
        }
        async create(ctx) {
            const {goodsID,num,price} = ctx.request.body;
            var uid=ctx.session.uid;
            const goods=await ctx.model.ShopGoods.findById(goodsID);
            const cart=await ctx.model.ShopCart.findOrCreate({
                where: {goodsID,uid},
                defaults:{uid,goodsID,name:goods.name,num,price,imgurl:goods.imgurl,goodsType:goods.goodsType}
            });
            return this.success("添加成功!",cart);
        }
    };
};