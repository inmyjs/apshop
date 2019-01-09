/**
 * Controller
 * @param app
 */


module.exports = app => {
    return class ShopGoodsClassController extends app.Controller {
        async get(ctx){
            let {parentId}=ctx.query;
            const result=await ctx.model.ShopGoodsClass.findAll({
                where:{parentId},raw:true
            });
            ctx.success("查询成功",result);
        }
    };
};
