/**
 *  主页Controller
 * @param app
 * @returns {OrderController}
 */
module.exports = app => {
    return class WishListController extends app.Controller {

        async index(ctx){
            var data= await this.getUserInfo();
            const res = await this.ctx.model.ShopUserWishList.findAndCountAll({
                where:{uid:data.uid}
            });
            data.wishlist=res.rows;
            await this.ctx.render('shop/template/'+app.config.viewTemplate+'/wishlist', data);
        }
        async del(ctx){
            const wishlist = await ctx.model.ShopUserWishList.findById(ctx.params.id);
            wishlist.destroy();
            this.success("删除成功!");
        }
        async create(ctx) {
            const {goodsID} = ctx.request.body;
            var uid=ctx.session.uid;
            const goods=await ctx.model.ShopGoods.findById(goodsID);
            const cart=await ctx.model.ShopUserWishList.findOrCreate({
                where: {goodsID,uid},
                defaults:{uid,goodsID,name:goods.name,imgurl:goods.imgurl,goodsType:goods.goodsType,price:goods.price}
            });
            return this.success("添加成功!",cart);
        }
    };
};