/**
 *  主页Controller
 * @param app
 * @returns {OrderController}
 */
module.exports = app => {
    return class WishListController extends app.Controller {

        async index(ctx){
            let data= await ctx.getUserInfo();
            const res = await this.ctx.model.ShopUserWishlist.findAndCountAll({
                where:{uid:data.uid}
            });
            data.wishlist=res.rows;
            await this.ctx.render('shop/red/wishlist', data);
        }
        async del(ctx){
            const wishlist = await ctx.model.ShopUserWishlist.findById(ctx.params.id);
            wishlist.destroy();
            ctx.success("删除成功!");
        }
        async create(ctx) {
            const {goodsID} = ctx.request.body;
            let uid=ctx.session.uid;
            const goods=await ctx.model.ShopGoods.findById(goodsID);
            const cart=await ctx.model.ShopUserWishlist.findOrCreate({
                where: {goodsID,uid},
                defaults:{uid,goodsID,name:goods.name,imgurl:goods.imgurl,goodsType:goods.goodsType,price:goods.price}
            });
            return ctx.success("添加成功!",cart);
        }
    };
};