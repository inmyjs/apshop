/**
 * Controller
 * @param app
 */


module.exports = app => {
    return class UserController extends app.Controller {
        async index(ctx){

        }
        async create(ctx){
            var model=ctx.params.model;
            const body = ctx.request.body;
            const domain=eval(`ctx.model.${model}`);
            const res=await domain.create(body);
            this.success("保存成功!",res);
        }
        async update(ctx){
            var model=ctx.params.model;
            var id=ctx.params.id;
            const body = ctx.request.body;
            const domain=eval(`ctx.model.${model}`);
            const res=await domain.findById(id);
            if(res){
                res.update(body);
                this.success("保存成功!",res);
                return;
            }
            this.failure("保存失败!",res);
        }
        async destroy(ctx){
            var model=ctx.params.model;
            var id=ctx.params.id;
            const domain=eval(`ctx.model.${model}`);
            const res=await domain.findById(id);
            if(res){
                res.destroy();
                this.success("删除成功!",res);
                return;
            }
            this.failure("删除失败!",res);
        }
    };
};