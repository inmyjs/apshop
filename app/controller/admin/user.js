/**
 * Controller
 * @param app
 */

module.exports = app => {
    return class UserController extends app.Controller {
        async list(ctx){
            var {startDate,endDate,page,limit,status,username}=ctx.query;
            limit=Number(limit);
            var offset=(Number(page)-1)*limit;
            const Op = ctx.model.Op;
            const result = await ctx.model.User.findAndCountAll({
                where:{username:{[Op.like]: `%${username}%`},status:{[Op.like]: `%${status}%`},createTime:{[Op.between]: [startDate, endDate]},userType:'C'
                },offset,limit,raw:true
            });
            this.success("查询成功!",result.rows,result.count);
        }
        async info(ctx){
            const token = ctx.query.token;
            var user = await ctx.model.User.findOne({where: {uid:token},raw:true});
            if (!user) {
                this.failure("token已失效!");
                return;
            }
            user.role= ['admin'];
            user.token= user.uid;
            user.introduction= '我是超级管理员';
            user.avatar= 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif';
            user.name= user.username;
            this.success("获取成功!",user);
        }
        async del(ctx){
            const user = await ctx.model.User.findById(ctx.params.id);
            if(!user){
                this.failure("删除失败!");
                return;
            }
            user.destroy();
            this.success("删除成功!");
        }
        async status(ctx) {
            var {status, uid,opBy} = ctx.request.body;
            var user = await ctx.model.User.findById(uid);
            if (!user) {
                this.failure("操作失败，未查询到用户信息！");
                return;
            }
            user.update({
                status,note:ctx.helper.note(user.note,statusFilter(status))
            });
            this.success("状态更新成功!");
        }
    };
};
function statusFilter(status) {
    const statusMap = {
        0: '正常',
        C: '禁用',
    }
    return statusMap[status]
}