/**
 *  主页Controller
 * @param app
 * @returns {HomeController}
 */
const moment=require('moment');
const Controller = require('egg').Controller;
class HomeController extends Controller {
    async index(ctx){
        // 自定义导航栏
        //$navigator = model('Common')->get_navigator();
        //$this->assign('navigator', $navigator['middle']);
        //C('page_size');
        let data={};
        data.subscribe=0;

        const Op = ctx.model.Op;
        data.best_goods=await ctx.model.Goods.findAll({
            where:{is_best:1}
        });
        data.new_goods=await ctx.model.Goods.findAll({
            where:{is_new:1}
        });
        data.hot_goods=await ctx.model.Goods.findAll({
            where:{is_hot:1}
        });
        let time=new Date().getTime();
        data.promotion_goods=await ctx.model.Goods.findAll({
            where:{
                promote_price:{[Op.gt]:0},
                promote_start_date:{[Op.lte]:time},
                promote_end_date:{[Op.gte]:time},
            }
        });
        await ctx.render('wap/default/index',data);
        /*$this->assign('best_goods', model('Index')->goods_list('best', C('page_size')));
        $this->assign('new_goods', model('Index')->goods_list('new', C('page_size')));
        $this->assign('hot_goods', model('Index')->goods_list('hot', C('page_size')));
        // 调用促销商品
        $this->assign('promotion_goods', model('Index')->goods_list('promotion', C('page_size')));
        //首页推荐分类
        $cat_rec = model('Index')->get_recommend_res(10, 4);
        $this->assign('cat_best', $cat_rec[1]);
        $this->assign('cat_new', $cat_rec[2]);
        $this->assign('cat_hot', $cat_rec[3]);
        // 促销活动
        $this->assign('promotion_info', model('GoodsBase')->get_promotion_info());
        // 团购商品
        $this->assign('group_buy_goods', model('Groupbuy')->group_buy_list(C('page_size'), 1, 'goods_id', 'ASC'));
        // 获取分类
        $this->assign('categories', model('CategoryBase')->get_categories_tree());
        // 获取品牌
        $this->assign('brand_list', model('Brand')->get_brands($app = 'brand', C('page_size'), 1));
        // 分类下的文章
        $this->assign('cat_articles', model('Article')->assign_articles(1, 5)); // 1 是文章分类id ,5 是文章显示数量*/
    }

}
module.exports = HomeController;