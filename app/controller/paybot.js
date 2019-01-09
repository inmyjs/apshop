/**
 * Controller
 * @param app
 */

let crypto=require("crypto");
const moment=require('moment')
module.exports = app => {
    return class WxbotController extends app.Controller {
        async index(ctx){

        }
        async msg(ctx){
            let {time,memo,description,username,amount,sig,tradeNo,status}=ctx.request.body;
            // 签名
            let md5 = crypto.createHash("md5");
            let sig_valid = [
                time.toString(),
                tradeNo.toString(),
                amount.toString(),
                status.toString(),
                app.config.payKeys
            ].join("|");
            sig_valid = md5.update(sig_valid, "utf8").digest("hex");
            if(sig_valid!=sig){
                ctx.failure("签名错误");
                return;
            }
            let payMsg=await ctx.model.PayMsg.findOne({where:{tradeNo}});
            if(payMsg){
                ctx.body="success";
                return;
            }
            payMsg=await ctx.model.PayMsg.create({
                msgType:"支付宝转账",payTime:time,memo,description,username,amount,tradeNo,status
            });
            const order=await ctx.model.ShopOrder.findOne({where:{payCode:memo}});
            if(!order){
                ctx.helper.sendContent({
                    to: "573391755@qq.com",
                    title: '【Attention】天启皮肤商城系统通知',
                    name:'系统收到一个转账消息，但未查询到相应订单信息!',
                    content: `支付编号：${memo}，转账详情：${JSON.stringify(payMsg)}`,
                    success:function () {
                        console.log("邮件发送成功");
                    }
                });
                ctx.body="success";
                return;
            }
            order.update({paidAmount:(Number(order.paidAmount)+Number(amount))});
            let payDate=moment();
            let acc=Number(order.payableAmount)-(Number(order.paidAmount)+Number(amount));
            if(acc<=0) {
                order.update({billStatus: "S"});
                ctx.model.ShopOrderGoods.findAll({where:{billNo:order.billNo}}).then(goods =>  {
                    for(let good of goods){
                        ctx.model.ShopUserGoods.create({
                            goodsID:good.goodsID,name:good.name,goodsType:good.goodsType,num:good.num,price:good.price,imgurl:good.imgurl,payTime:payDate,uid:order.uid
                        });
                    }
                });
            }
            else
                order.update({billStatus:"L"});
            ctx.model.ShopPayment.create({
                billNo:order.billNo,payCode:memo,payDate,uid:order.uid,paidAmount:amount,billStatus:"S",opBy:order.username
            });
            ctx.body="success";
        }
    };
};