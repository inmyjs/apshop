/**
 * 日报表
 * @type
 */
let moment=require('moment')

module.exports = {
    schedule: {
        cron: '0 59 23 * * *',
        type: 'worker',
    },
    task: async function (ctx) {
        const date=moment().format('YYYY-MM-DD');
        const endDate=moment().format('YYYY-MM-DD HH:mm:ss');
        const startDate=moment(date+' 00:00:00').format('YYYY-MM-DD HH:mm:ss');
        let report={};
        const Op = ctx.model.Op;
        let register = await ctx.model.User.count({
            where:{userType:'C',createTime:{[Op.between]: [startDate, endDate]}}
        });
        let account = await ctx.model.ShopPayment.sum('paidAmount', { where:{billStatus:'S',createTime:{[Op.between]: [startDate, endDate]}}});
        let order = await ctx.model.ShopOrder.count({where:{billStatus:'S',createTime:{[Op.between]: [startDate, endDate]}}});
        let guestBook = await ctx.model.GuestBook.count({where:{createTime:{[Op.between]: [startDate, endDate]}}});
        report.register=register?register:0;
        report.account=account?account:0;
        report.order=order?order:0;
        report.guestBook=guestBook?guestBook:0;
        for(let key in report){
            await ctx.model.ReportDay.create({
                reportDate:date,reportType:key,data:report[key]
            });
        }
    }
};
