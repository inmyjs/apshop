/**
 *  主页Controller
 * @param app
 * @returns {GoodsController}
 */
const moment=require('moment')
module.exports = app => {
    return class GoodsController extends app.Controller {
        async create(ctx){
            const {goodsID,name, title,goodsType,imgurl,price,priceMarket,stock,note,goodsStatus,sortNo,opBy,goodsImages,recommendFlag}= ctx.request.body;
            let opAt=moment();
            let goods;
            if(goodsID){
                goods=await ctx.model.ShopGoods.findById(goodsID);
                if(!goods){
                    ctx.failure("保存失败，未查询到商品相关信息！");
                    return;
                }else{
                    goods.update({
                        name, title,goodsType,imgurl,price,priceMarket,stock,note,goodsStatus,sortNo,opBy,opAt,recommendFlag
                    });
                    await ctx.model.query("DELETE FROM `shop_goodsImages` where goodsID = :goodsID", { replacements: { goodsID },type: ctx.model.QueryTypes.DELETE});
                    for(let index in goodsImages){
                        await ctx.model.ShopGoodsImages.create({
                            goodsID:goodsID,imgurl:goodsImages[index].url,name:goodsImages[index].name,sortNo:index
                        });
                    }
                }
            }else{
                goods=await ctx.model.ShopGoods.create({
                    name, title,goodsType,imgurl,price,priceMarket,stock,note,goodsStatus,sortNo,opBy,opAt,recommendFlag
                });
                for(let index in goodsImages){
                    await ctx.model.ShopGoodsImages.create({
                        goodsID:goods.goodsID,imgurl:goodsImages[index].url,name:goodsImages[index].name,sortNo:index
                    });
                }
            }
            ctx.success("保存成功!");
        }
        async list(ctx){
            let {title,page,limit,type}=ctx.query;
            limit=Number(limit);
            let offset=(Number(page)-1)*limit;
            const Op = ctx.model.Op;
            const result = await ctx.model.ShopGoods.findAndCountAll({
                where:{
                    [Op.or]:[{name:{[Op.like]: `%${title}%`}},{title:{[Op.like]: `%${title}%`}}],goodsType:{[Op.like]: `%${type}%`}
                },offset,limit
            });
            ctx.success("查询成功!",result.rows,result.count);
        }
        async detail(ctx){
            const goods = await ctx.model.ShopGoods.findOne({where:{goodsID:ctx.params.id},raw:true});
            if(!goods){
                ctx.failure("查询失败!");
                return;
            }
            const goodsImages = await ctx.model.ShopGoodsImages.findAll({
                where:{goodsID:goods.goodsID},
                order:[['sortNo', 'ASC']],
                raw:true
            });
            let imgs=[];
            for(let img of goodsImages){
                imgs.push({name:img.name,url:img.imgurl,status:'finished'});
            }
            goods.goodsImages=imgs;
            ctx.success("查询成功!",goods);
        }
        async del(ctx){
            const goods = await ctx.model.ShopGoods.findById(ctx.params.id);
            if(!goods){
                ctx.failure("删除失败!");
                return;
            }
            if(goods.goodsStatus=='U'){
                ctx.failure("上架商品不允许删除，请先下架!");
                return;
            }
            goods.destroy();
            ctx.success("删除成功!");
        }
        async status(ctx) {
            let {goodsStatus, goodsID} = ctx.request.body;
            let goods = await ctx.model.ShopGoods.findById(goodsID);
            if (!goods) {
                ctx.failure("操作失败，未查询到商品相关信息！");
                return;
            }
            goods.update({
                goodsStatus
            });
            ctx.success("状态更新成功!");
        }
        async recommend(ctx) {
            let {recommendFlag, goodsID} = ctx.request.body;
            let goods = await ctx.model.ShopGoods.findById(goodsID);
            if (!goods) {
                ctx.failure("操作失败，未查询到商品相关信息！");
                return;
            }
            goods.update({
                recommendFlag
            });
            ctx.success("状态更新成功!");
        }
    };
};