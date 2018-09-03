/**
 * Controller
 * @param app
 */


module.exports = app => {
    return class BlogClassController extends app.Controller {
        async get(ctx){
            var {blogType,parentId}=ctx.query;
            const result=await ctx.model.BlogClass.findAll({
                where:{blogType,parentId},raw:true
            });
            this.success("查询成功",result);
        }
    };
};