/**
 *  主页Controller
 * @param app
 * @returns {GoodsController}
 */
const moment=require('moment')
module.exports = app => {
    return class GoodsController extends app.Controller {
        async list(ctx){
            let {startDate,endDate,page,limit,billStatus,billNo}=ctx.query;
            limit=Number(limit);
            let offset=(Number(page)-1)*limit;
            const Op = ctx.model.Op;
            const result = await ctx.model.ShopOrder.findAndCountAll({
                where:{billNo:{[Op.like]: `%${billNo}%`},billStatus:{[Op.like]: `%${billStatus}%`},billDate:{[Op.between]: [startDate, endDate]}
                },offset,limit
            });
            ctx.success("查询成功!",result.rows,result.count);
        }
        async detail(ctx){
            const order = await ctx.model.ShopOrder.findOne({where:{billNo:ctx.params.id},raw:true});
            if(!order){
                ctx.failure("查询失败!");
                return;
            }
            const goodsImages = await ctx.model.ShopOrderImages.findAll({
                where:{billNo:order.billNo},
                order:[['sortNo', 'ASC']],
                raw:true
            });
            let imgs=[];
            for(let img of goodsImages){
                imgs.push({name:img.name,url:img.imgurl,status:'finished'});
            }
            order.goodsImages=imgs;
            ctx.success("查询成功!",order);
        }
        async del(ctx){
            const order = await ctx.model.ShopOrder.findById(ctx.params.id);
            if(!order){
                ctx.failure("删除失败!");
                return;
            }
            if(order.billStatus=='S'){
                ctx.failure("已付款订单不允许删除!");
                return;
            }
            order.destroy();
            ctx.success("删除成功!");
        }
        async status(ctx) {
            let {billStatus, billNo,opBy} = ctx.request.body;
            let order = await ctx.model.ShopOrder.findById(billNo);
            if (!order) {
                ctx.failure("操作失败，未查询到订单信息！");
                return;
            }
            if(billStatus=='S'){
                let payDate=moment();
                let amount=Number(order.payableAmount)-Number(order.paidAmount);
                await ctx.model.ShopPayment.create({
                    billNo,payCode:order.payCode,payDate,uid:order.uid,paidAmount:amount,billStatus:"S",opBy,payType:'A',note:opBy+'管理员后台确认收款'
                });
            }
            order.update({
                billStatus
            });
            ctx.success("状态更新成功!");
        }
    };
};