/**
 * 日报表
 * @type
 */
var moment=require('moment')

module.exports = {
    schedule: {
        cron: '0 59 23 * * *',
        type: 'all', // 指定所有的 worker 都需要执行
    },
    * task(ctx) {
        const date=moment().format('YYYY-MM-DD');
        const endDate=moment().format('YYYY-MM-DD HH:mm:ss');
        const startDate=moment(date+' 00:00:00').format('YYYY-MM-DD HH:mm:ss');
        var report={};
        const Op = ctx.model.Op;
        var register = yield ctx.model.User.count({
            where:{userType:'C',createTime:{[Op.between]: [startDate, endDate]}}
        });
        var account = yield ctx.model.ShopPayment.sum('paidAmount', { where:{billStatus:'S',createTime:{[Op.between]: [startDate, endDate]}}});
        var order = yield ctx.model.ShopOrder.count({where:{billStatus:'S',createTime:{[Op.between]: [startDate, endDate]}}});
        report.register=register?register:0;
        report.account=account?account:0;
        report.order=order?order:0;
        for(var key in report){
            yield ctx.model.ReportDay.create({
                reportDate:date,reportType:key,data:report[key]
            });
        }
    }
};