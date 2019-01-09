/**
 *  主页Controller
 * @param app
 * @returns {OrderController}
 */
const moment = require('moment');
module.exports = app => {
    return class OrderController extends app.Controller {
        async checkout(ctx){
            let data= await ctx.getUserInfo();
            const result = await ctx.model.ShopCart.findAndCountAll({
                where:{uid:data.uid}
            });
            data.cart=result.rows;
            let sumPrice=0.00;
            for(let goods of data.cart){
                sumPrice+=goods.price*goods.num;
            }
            data.sumPrice=sumPrice;
            await ctx.render('shop/red/checkout', data);
        }
        async index(ctx){
            let data= await ctx.getUserInfo();
            /*let orders=await ctx.model.ShopOrder.findAll({where:{uid:data.uid},order:[['createTime', 'DESC']]});
            for(let order of orders ){
                let goods=await ctx.model.ShopOrderGoods.findAll({where:{billNo:order.billNo}});
                order.goods=goods;
            }
            data.orders=orders;*/
            await ctx.render('shop/red/order', data);
        }
        async detail(ctx){
            let data= await ctx.getUserInfo();
            const order = await ctx.model.ShopOrder.findById(ctx.params.billNo);
            data.order=order;
            let goods=await ctx.model.ShopOrderGoods.findAll({where:{billNo:order.billNo}});
            data.goods=goods;
            await ctx.render('shop/red/order-detail', data);
        }
        async del(ctx){
            const order = await ctx.model.ShopOrder.findById(ctx.params.billNo);
            order.destroy();
            ctx.success("删除成功!");
        }
        async cancel(ctx){
            const order = await ctx.model.ShopOrder.findById(ctx.params.billNo);
            order.update({billStatus:'C'});
            ctx.success("已取消订单!");
        }
        async create(ctx) {
            const {billAmount}=ctx.request.body;
            let uid=ctx.session.uid;
            let username=ctx.session.username;
            const cart=await ctx.model.ShopCart.findAll({
                where: {uid}
            });
            let billDate=moment();
            let billNo="ZT"+moment().format('YYYYMMDDHHmmss');
            let payCode;
            if(app.payCodes==null){
                let codes=await ctx.model.ShopOrder.findAll({
                    attributes: ['payCode']
                });
                app.payCodes= new Set();
                for(let i=0;i<codes.length;i++){
                    app.payCodes.add(codes[i].payCode);
                }
            }
            while(true){
                payCode=Math.random().toString().slice(-6);
                if(!app.payCodes.has(payCode)){
                    app.payCodes.add(payCode);
                    break;
                }
            }
            let prefAmount=0;
            let payableAmount=billAmount-prefAmount;
            ctx.model.ShopOrder.create({
                billNo,billDate,uid,username,billAmount,payCode,payableAmount,prefAmount,paidAmount:0
            });
            for(let goods of cart){
                await ctx.model.ShopOrderGoods.create({
                    billNo,goodsID:goods.goodsID,name:goods.name,num:goods.num,price:goods.price,imgurl:goods.imgurl,goodsType:goods.goodsType
                });
                goods.destroy();
            }
            /*await ctx.model.ShopCart.destroy({
                where: {uid}
            });*/
            return ctx.success("添加成功!",billNo);
        }
        async get(ctx) {
            let {page,limit,billStatus}=ctx.query;
            limit=Number(limit);
            let offset=(Number(page)-1)*limit;
            let orders,uid=ctx.session.uid;
            if(billStatus=='A')
                orders=await ctx.model.ShopOrder.findAll({where:{uid},order:[['createTime', 'DESC']], raw: true,offset,limit });
            else
                orders=await ctx.model.ShopOrder.findAll({where:{uid,billStatus},order:[['createTime', 'DESC']], raw: true,offset,limit  });

            for(let order of orders ){
                let goods=await ctx.model.ShopOrderGoods.findAll({where:{billNo:order.billNo}, raw: true });
                order.goods=goods;
            }
            ctx.success("查询成功!",orders);
        }
    };
};
