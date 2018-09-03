/**
 *  主页Controller
 * @param app
 * @returns {OrderController}
 */
const moment = require('moment');
const axios=require('axios');
var crypto=require("crypto");
module.exports = app => {
    return class OrderController extends app.Controller {
        async index(ctx){
            var data= await this.getUserInfo();
            var billNo=ctx.params.billNo;
            const order=await ctx.model.ShopOrder.findById(billNo);
            if(!order){
                ctx.throw(404);
                return;
            }
            data.order=order;
            if(order.billStatus=="S"){
                await this.ctx.render('shop/template/'+app.config.viewTemplate+'/order', data);
                return;
            }
            await this.ctx.render('shop/template/'+app.config.viewTemplate+'/pay', data);
        }
        async confirm(ctx){
            var me=this;
            var billNo=ctx.params.billNo;
            const order=await ctx.model.ShopOrder.findById(billNo);
            if(!order){
                this.failure("订单编号错误!");
                return;
            }
            switch (order.billStatus){
                case "S":
                    this.success("订单已支付成功，赶快去下载吧!");
                    return;
                case "L":
                    var acc=order.payableAmount-order.paidAmount;
                    if(acc>0){
                        this.failure("您还需要再支付:" + acc + "元，如果已经付清，请稍候再查询(大约1分钟)。");
                    }
                    return;
                case "P":
                    var time=moment().format('X');
                    var payCode=order.payCode;
                    // 签名
                    var md5 = crypto.createHash("md5");
                    var token = [
                        payCode,
                        time.toString(),
                        app.config.payKeys
                    ].join("|");
                    token = md5.update(token, "utf8").digest("hex");
                    var response=await axios.get(app.config.payServer+'/api/order', {
                        params: {payCode, time, token}
                    }).catch(function (error) {
                        console.log(error);
                        me.failure("订单还未支付，如果已经转账，请稍候再查询(大约1分钟)。");
                        return;
                    });
                    if(response) {
                        var res = response.data;
                        if (res.success) {
                            sleep(3000);
                            var i = 0;
                            while (i < 2) {
                                var order2 = await ctx.model.ShopOrder.findById(billNo);
                                if (order2.billStatus == "S") {
                                    me.success("订单已支付成功，赶快去下载吧!");
                                    return;
                                } else if (order2.billStatus == "L") {
                                    var acc = order.payableAmount - order.paidAmount;
                                    me.failure("您还需要再支付:" + acc + "元，如果已经付清，请稍候再查询(大约1分钟)。");
                                    return;
                                } else {
                                    sleep(2000);
                                    i++;
                                    me.failure("订单还未支付，如果已经转账，请稍候再查询(大约1分钟)。");
                                    continue;
                                }
                            }
                        } else {
                            console.log(JSON.stringify(res));
                            me.failure("订单还未支付，如果已经转账，请稍候再查询(大约1分钟)。");
                        }
                    }
                    return;
            }
        }
    };
};
function sleep(sleepTime) {
    for(var start = +new Date; +new Date - start <= sleepTime;) {};
}