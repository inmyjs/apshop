/**
 * 数据库基本对象操作
 */
const { Controller } = require('egg');
class RegionController extends Controller {
    async index(ctx){
        let {parent_id}=ctx.query;
        let res=await ctx.model.Region.findAll({
            where:{parent_id},
            raw:true,
        });
        for(let re of res){
            let childs=await ctx.model.Region.findAll({
                where:{parent_id:re.region_id},
                raw:true,
            });
            if(childs.length>0){
                re.cities=[];
            }
            re.all={
                region_name: re.region_name,
                region_id: re.region_id,
            }
        }
        ctx.success("查询成功!", res);

    }
}
module.exports = RegionController;
