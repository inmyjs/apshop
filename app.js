/**
 *  全局定义
 * @param app
 */
module.exports = app => {
    app.payCodes= null;
    app.root=__dirname;
    app.beforeStart(function* () {
        // 应用会等待这个函数执行完成才启动
    });
    //自定义Controller
    class CustomController extends app.Controller {
        async getUserInfo () {
            var info={uid:this.ctx.session.uid,username:this.ctx.session.username,nickname:this.ctx.session.nickname,isLogin:this.ctx.session.isLogin};
            const res = await this.ctx.model.ShopCart.findAndCountAll({
                where:{uid:info.uid}
            });
            info.cartCount=res.count;
            info.cart=res.rows;
            info.page_title='天启皮肤商城';
            return info;
        }
        success(msg,data,total) {
            this.ctx.body = {
                success: true,
                msg,
                result:data,
                total:total||0
            };
        }
        failure(msg,data,total) {
            this.ctx.body = {
                success: false,
                msg,
                result:data,
                total:total||0
            };
        }
        notFound(msg) {
            msg = msg || 'not found';
            this.ctx.throw(404, msg);
        }
    }
    app.Controller = CustomController;
};