/**
 * 数据库基本对象操作
 */
const { Controller } = require('egg');
class TreeController extends Controller {
    async index(ctx){
        let model = ctx.params.model;
        let {where}=ctx.query;
        let modelClass=model.substring(0,1).toUpperCase()+model.substring(1);
        let res = await ctx.model.query(`select * from ${model} where ${where}`, {
            model: ctx.model[modelClass] ,
            type: ctx.model.QueryTypes.SELECT,
        });
        ctx.success("查询成功!", res);

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
module.exports = TreeController;
