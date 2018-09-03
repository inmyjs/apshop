/**
 * 路由配置
 * @param app
 */
module.exports = app => {
    const isLoginUser = app.middlewares.isLoginUser();
    const isLoginUserAjax = app.middlewares.isLoginUserAjax();
    app.get('/', app.controller.shop.home.index);

    //对象统一操作接口
    app.post('/act/:model', isLoginUserAjax,app.controller.act.create);
    app.del('/act/:model/:id', isLoginUserAjax,app.controller.act.destroy);
    app.put('/act/:model/:id', isLoginUserAjax,app.controller.act.update);

    //邮件发送接口
    app.post('/email/send', app.controller.email.send);
    app.get('/email/valid', app.controller.email.valid);

    //验证码
    app.get('/captcha', app.controller.captcha.index);

    //注册&登录
    app.get('/login', app.controller.shop.login.index);
    app.post('/login', app.controller.shop.login.login);
    app.post('/logout', app.controller.shop.login.logout);
    app.resources('/signIn', app.controller.shop.signIn);
    app.get('/forget', app.controller.shop.login.forget);
    app.get('/reset', app.controller.shop.reset.index);
    app.post('/reset', app.controller.shop.reset.password);

    //用户
    app.resources('/user', app.controller.user);

    //商品
    app.get('/shop/goods/:id', app.controller.shop.goods.show);
    app.get('/shop/cart', isLoginUser,app.controller.shop.cart.show);
    app.del('/shop/cart/:id',isLoginUserAjax, app.controller.shop.cart.del);
    app.post('/shop/cart',isLoginUserAjax, app.controller.shop.cart.create);
    app.get('/shop/checkout',isLoginUser, app.controller.shop.order.checkout);
    app.post('/shop/order',isLoginUserAjax, app.controller.shop.order.create);
    app.get('/shop/pay/:billNo',isLoginUser, app.controller.shop.pay.index);
    app.get('/shop/confirmPay/:billNo', isLoginUser,app.controller.shop.pay.confirm);
    app.get('/shop/get', app.controller.shop.goods.get);

    //个人中心
    app.get('/shop/uc', isLoginUser,app.controller.shop.uc.index);
    app.get('/shop/order',isLoginUser, app.controller.shop.order.index);
    app.post('/shop/cancelOrder/:billNo',isLoginUserAjax, app.controller.shop.order.cancel);
    app.get('/shop/orderDetail/:billNo',isLoginUser, app.controller.shop.order.detail);
    app.get('/shop/orderByStatus',isLoginUserAjax, app.controller.shop.order.get);
    app.get('/shop/myProduct',isLoginUser, app.controller.shop.goods.myProduct);
    app.get('/shop/wishlist',isLoginUser, app.controller.shop.wishlist.index);
    app.post('/shop/wishlist',isLoginUserAjax, app.controller.shop.wishlist.create);
    app.del('/shop/wishlist/:id',isLoginUserAjax, app.controller.shop.wishlist.del);

    //联系我们
    app.get('/shop/contact', app.controller.shop.contact.index);
    app.post('/shop/contact', app.controller.shop.contact.create);
    app.get('/shop/dz', app.controller.shop.contact.dz);
    app.get('/shop/blog',isLoginUser ,app.controller.shop.blog.index);
    app.get('/shop/blog/detail', isLoginUser,app.controller.shop.blog.detail);
    app.get('/shop/blog/get',app.controller.shop.blog.get);
    app.get('/shop/blogClass',app.controller.shop.blogClass.get);

    //支付API
    app.post('/api/pay/msg', app.controller.paybot.msg);

    //admin管理后台
    app.get('/admin', app.controller.admin.home.index);
    app.post('/admin/login', app.controller.admin.login.login);
    app.post('/admin/logout', app.controller.admin.login.logout);
    app.get('/admin/user/info', app.controller.admin.user.info);
    app.get('/admin/goods/list', app.controller.admin.goods.list);
    app.get('/admin/goods/:id', app.controller.admin.goods.detail);
    app.post('/admin/goods', app.controller.admin.goods.create);
    app.del('/admin/goods/:id', app.controller.admin.goods.del);
    app.post('/admin/goods/status', app.controller.admin.goods.status);
    app.post('/admin/goods/recommend', app.controller.admin.goods.recommend);
    app.get('/admin/order/list', app.controller.admin.order.list);
    app.post('/admin/order/status', app.controller.admin.order.status);
    app.get('/admin/custom/list', app.controller.admin.user.list);
    app.post('/admin/custom/status', app.controller.admin.user.status);
    app.get('/admin/report', app.controller.admin.report.data);
    app.get('/admin/report/detail', app.controller.admin.report.detail);

    //上传文件
    app.post('/admin/upload/:type', app.controller.file.upload);

    app.get('/file/download/:id', isLoginUser,app.controller.file.download);

};