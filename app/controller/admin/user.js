/**
 * Controller
 * @param app
 */

module.exports = app => {
    return class UserController extends app.Controller {
        async list(ctx){
            let {startDate,endDate,page,limit,status,username}=ctx.query;
            limit=Number(limit);
            let offset=(Number(page)-1)*limit;
            const Op = ctx.model.Op;
            const result = await ctx.model.User.findAndCountAll({
                where:{username:{[Op.like]: `%${username}%`},status:{[Op.like]: `%${status}%`},createTime:{[Op.between]: [startDate, endDate]},userType:'C'
                },offset,limit,raw:true
            });
            ctx.success("查询成功!",result.rows,result.count);
        }
        async info(ctx){
            const token = ctx.query.token;
            let uid=ctx.app.lru.get(token);
            let user = await ctx.model.User.findOne({
                attributes: ['uid', 'username','nickname','avatar','status','note'],
                where: {uid},raw:true
            });
            if (!user) {
                ctx.failure("token已失效!");
                return;
            }
            user.roles= ['admin'];
            user.introduction= user.nickname;
            user.name= user.username;
            ctx.success("获取成功!",user);
        }
        async del(ctx){
            const user = await ctx.model.User.findById(ctx.params.id);
            if(!user){
                ctx.failure("删除失败!");
                return;
            }
            user.destroy();
            ctx.success("删除成功!");
        }
        async status(ctx) {
            let {status, uid,opBy} = ctx.request.body;
            let user = await ctx.model.User.findById(uid);
            if (!user) {
                ctx.failure("操作失败，未查询到用户信息！");
                return;
            }
            user.update({
                status,note:ctx.helper.note(user.note,statusFilter(status))
            });
            ctx.success("状态更新成功!");
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
