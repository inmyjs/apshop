/**
 * 数据库基本对象操作
 */
const { Controller } = require('egg');
class TableController extends Controller {
    async index(ctx){
        let model = ctx.params.model;
        let {page,limit,where}=ctx.query;
        limit=Number(limit);
        let modelClass=model.substring(0,1).toUpperCase()+model.substring(1);
        let offset=(Number(page)-1)*limit;
        let count_arr = await ctx.model.query(`select count(*) as count from ${model} where ${where}`, {
            type: ctx.model.QueryTypes.SELECT,
        });
        let res = await ctx.model.query(`select * from ${model} where ${where} limit ${limit} offset ${offset}`, {
            model: ctx.model[modelClass] ,
            type: ctx.model.QueryTypes.SELECT,
        });
        ctx.success("查询成功!", res,count_arr[0].count);

    }
    async show(ctx) {
        let model = ctx.params.model;
        let modelClass=model.substring(0,1).toUpperCase()+model.substring(1);
        let id = ctx.params.id;
        let res = await ctx.model[modelClass].findById(id);
        ctx.success("查询成功!", res);

    }
    async create(ctx){
        let model=ctx.params.model;
        let modelClass=model.substring(0,1).toUpperCase()+model.substring(1);
        let body = ctx.request.body;
        let res=await ctx.model[modelClass].create(body);
        ctx.success("保存成功!",res);
    }
    async update(ctx){
        let model=ctx.params.model;
        let modelClass=model.substring(0,1).toUpperCase()+model.substring(1);
        let id=ctx.params.id;
        let body = ctx.request.body;
        let res=await ctx.model[modelClass].findById(id);
        if(res){
            res.update(body);
            ctx.success("更新成功!");
            return;
        }
        ctx.failure("更新失败!");
    }
    async updateStatus(ctx){
        let model=ctx.params.model;
        let modelClass=model.substring(0,1).toUpperCase()+model.substring(1);
        let id=ctx.params.id;
        let {status} = ctx.request.body;
        let res=await ctx.model[modelClass].findById(id);
        if(res){
            res.update({status});
            ctx.success("更新成功!");
            return;
        }
        ctx.failure("更新失败!");
    }
    async destroy(ctx){
        let model=ctx.params.model;
        let modelClass=model.substring(0,1).toUpperCase()+model.substring(1);
        let id=ctx.params.id;
        let res=await ctx.model[modelClass].findById(id);
        if(res){
            res.destroy();
            ctx.success("删除成功!");
            return;
        }
        ctx.failure("删除失败!");
    }
}
module.exports = TableController;
