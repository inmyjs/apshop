/**
 *  主页Controller
 * @param app
 * @returns {HomeController}
 */
const moment=require('moment');
module.exports = app => {
    return class HomeController extends app.Controller {
        async index(ctx){
            var data= await this.getUserInfo();
            const shopRecommendGoods = await ctx.model.ShopGoods.findAll({
                where:{recommendFlag:'1',goodsStatus:'U'},
                order:[['sortNo', 'ASC']],
                limit:3
            });
            data.shopRecommendGoods=shopRecommendGoods;
            const shopGoodsT = await ctx.model.ShopGoods.findAll({
                where:{recommendFlag:'0',goodsType:'T',goodsStatus:'U'},
                order:[['sortNo', 'ASC']]
            });
            data.shopGoodsT=shopGoodsT;
            const shopGoodsC = await ctx.model.ShopGoods.findAll({
                where:{recommendFlag:'0',goodsType:'C',goodsStatus:'U'},
                order:[['sortNo', 'ASC']]
            });
            data.shopGoodsC=shopGoodsC;
            data.active_page=1;
            data.isNew=function (date) {
                console.log(date);
                var _date=moment(date).add(3, 'd');
                console.log(_date);
                return moment().isBefore(_date);
            };
            await this.ctx.render('shop/template/'+app.config.viewTemplate+'/index', data);
        }
    };
};