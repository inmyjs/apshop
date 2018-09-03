/**
 * Controller
 * @param app
 */
var moment=require('moment');
module.exports = app => {
    return class ReportController extends app.Controller {
        async data(ctx){
            var report={};
            report.register = await ctx.model.ReportDay.sum('data', { where:{reportType:'register'}});
            report.account = await ctx.model.ReportDay.sum('data', { where:{reportType:'account'}});
            report.order = await ctx.model.ReportDay.sum('data', { where:{reportType:'order'}});
            report.guestBook = await ctx.model.GuestMessage.count({ where:{status:'0'}});
            this.success("查询成功!",report);
        }
        async detail(ctx){
            var {reportType,range,type}=ctx.query;
            var report={xdata:[],ydata:[]};
            switch (type){
                case 'D':
                    var endDate=moment().format('YYYY-MM-DD');
                    var startDate=moment().subtract(Number(range), 'd').format('YYYY-MM-DD');
                    const Op = ctx.model.Op;
                    var reportDays=await ctx.model.ReportDay.findAll({attributes: ['reportDate','data'],
                        where:{reportType,reportDate:{[Op.between]: [startDate, endDate]}},
                        order:[['reportDate', 'ASC']],
                        raw:true
                    });
                    for(var reportDay of reportDays){
                        report.xdata.push(reportDay.reportDate);
                        report.ydata.push(reportDay.data);
                    }
                    break;
            }
            this.success("查询成功!",report);
        }

    };
};
