/**
 *  主页Controller
 * @param app
 * @returns {OrderController}
 */
const moment = require('moment');
module.exports = app => {
    return class OrderController extends app.Controller {
        async checkout(ctx){
            var data= await this.getUserInfo();
            const result = await ctx.model.ShopCart.findAndCountAll({
                where:{uid:data.uid}
            });
            data.cart=result.rows;
            var sumPrice=0.00;
            for(var goods of data.cart){
                sumPrice+=goods.price*goods.num;
            }
            data.sumPrice=sumPrice;
            await ctx.render('shop/template/'+app.config.viewTemplate+'/checkout', data);
        }
        async index(ctx){
            var data= await this.getUserInfo();
            /*var orders=await ctx.model.ShopOrder.findAll({where:{uid:data.uid},order:[['createTime', 'DESC']]});
            for(var order of orders ){
                var goods=await ctx.model.ShopOrderGoods.findAll({where:{billNo:order.billNo}});
                order.goods=goods;
            }
            data.orders=orders;*/
            await ctx.render('shop/template/'+app.config.viewTemplate+'/order', data);
        }
        async detail(ctx){
            var data= await this.getUserInfo();
            const order = await ctx.model.ShopOrder.findById(ctx.params.billNo);
            data.order=order;
            var goods=await ctx.model.ShopOrderGoods.findAll({where:{billNo:order.billNo}});
            data.goods=goods;
            await ctx.render('shop/template/'+app.config.viewTemplate+'/order-detail', data);
        }
        async del(ctx){
            const order = await ctx.model.ShopOrder.findById(ctx.params.billNo);
            order.destroy();
            this.success("删除成功!");
        }
        async cancel(ctx){
            const order = await ctx.model.ShopOrder.findById(ctx.params.billNo);
            order.update({billStatus:'C'});
            this.success("已取消订单!");
        }
        async create(ctx) {
            const {billAmount}=ctx.request.body;
            var uid=ctx.session.uid;
            var username=ctx.session.username;
            const cart=await ctx.model.ShopCart.findAll({
                where: {uid}
            });
            var billDate=moment();
            var billNo="ZT"+moment().format('YYYYMMDDHHmmss');
            var payCode;
            if(app.payCodes==null){
                var codes=await ctx.model.ShopOrder.findAll({
                    attributes: ['payCode']
                });
                app.payCodes= new Set();
                for(var i=0;i<codes.length;i++){
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
            var prefAmount=0;
            var payableAmount=billAmount-prefAmount;
            ctx.model.ShopOrder.create({
                billNo,billDate,uid,username,billAmount,payCode,payableAmount,prefAmount,paidAmount:0
            });
            for(var goods of cart){
                await ctx.model.ShopOrderGoods.create({
                    billNo,goodsID:goods.goodsID,name:goods.name,num:goods.num,price:goods.price,imgurl:goods.imgurl,goodsType:goods.goodsType
                });
                goods.destroy();
            }
            /*await ctx.model.ShopCart.destroy({
                where: {uid}
            });*/
            return this.success("添加成功!",billNo);
        }
        async get(ctx) {
            var {page,limit,billStatus}=ctx.query;
            limit=Number(limit);
            var offset=(Number(page)-1)*limit;
            var orders,uid=ctx.session.uid;
            if(billStatus=='A')
                orders=await ctx.model.ShopOrder.findAll({where:{uid},order:[['createTime', 'DESC']], raw: true,offset,limit });
            else
                orders=await ctx.model.ShopOrder.findAll({where:{uid,billStatus},order:[['createTime', 'DESC']], raw: true,offset,limit  });

            for(var order of orders ){
                var goods=await ctx.model.ShopOrderGoods.findAll({where:{billNo:order.billNo}, raw: true });
                order.goods=goods;
            }
            this.success("查询成功!",orders);
        }
    };
};
