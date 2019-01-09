/**
 *
 * @type {{foo(*)}}
 */
module.exports = {
    isMobile() {
        let deviceAgent = this.get("user-agent").toLowerCase();
        let agentID = deviceAgent.match(/(iphone|ipod|ipad|android)/);
        if(agentID){
            //手机访问
            return true;
        }else{
            //电脑访问
            return false;
        }
    },
    success(msg,data,total) {
        this.body = {
            success: true,
            msg,
            result:data,
            total
        };
    },
    failure(msg,data) {
        this.body = {
            success: false,
            msg,
            result:data,
        };
    },
    async infoPage(msg) {
        await this.render('500',{msg});
    },
    async getUserInfo () {
        let info={uid:this.session.uid,username:this.session.username,nickname:this.session.nickname,isLogin:this.session.isLogin};
        const res = await this.model.ShopCart.findAndCountAll({
            where:{uid:info.uid}
        });
        info.cartCount=res.count;
        info.cart=res.rows;
        return info;
    }
};
