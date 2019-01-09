/**
 * Controller
 * @param app
 */
let moment=require('moment');
module.exports = app => {
    return class ReportController extends app.Controller {
        async data(ctx){
            let report={};
            report.register = await ctx.model.ReportDay.sum('data', { where:{reportType:'register'}});
            report.account = await ctx.model.ReportDay.sum('data', { where:{reportType:'account'}});
            report.order = await ctx.model.ReportDay.sum('data', { where:{reportType:'order'}});
            report.guestBook = await ctx.model.ReportDay.sum('data', { where:{reportType:'guestBook'}});
            ctx.success("查询成功!",report);
        }
        async detail(ctx){
            let {reportType,range,type}=ctx.query;
            let report={xdata:[],ydata:[]};
            switch (type){
                case 'D':
                    let endDate=moment().format('YYYY-MM-DD');
                    let startDate=moment().subtract(Number(range), 'd').format('YYYY-MM-DD');
                    const Op = ctx.model.Op;
                    let reportDays=await ctx.model.ReportDay.findAll({attributes: ['reportDate','data'],
                        where:{reportType,reportDate:{[Op.between]: [startDate, endDate]}},
                        order:[['reportDate', 'ASC']],
                        raw:true
                    });
                    for(let reportDay of reportDays){
                        report.xdata.push(reportDay.reportDate);
                        report.ydata.push(reportDay.data);
                    }
                    break;
            }
            ctx.success("查询成功!",report);
        }

    };
};
