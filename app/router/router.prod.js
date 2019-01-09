/**
 * 路由配置
 * @param app
 */
module.exports = app => {

    //--------------------------------------------------
    // 中间件
    //--------------------------------------------------
    const isLoginUser = app.middlewares.isLoginUser();
    //const isInstalled = app.middlewares.isInstalled();

    //--------------------------------------------------
    // 基础接口
    //--------------------------------------------------
    app.get('/', app.controller.shop.home.index);
    app.get('/install', app.controller.install.index);
    app.get('/404', app.controller.home.notFound);
    //邮件发送接口
    app.post('/email/send', app.controller.email.send);
    app.get('/email/valid', app.controller.email.valid);
    //验证码
    app.get('/captcha', app.controller.captcha.index);

    //--------------------------------------------------
    // PC商城
    //--------------------------------------------------
    //app.get('/shop', app.controller.shop.home.index);
    //注册&登录
    app.get('/shop/login', app.controller.shop.login.index);
    app.post('/shop/login', app.controller.shop.login.login);
    app.post('/shop/logout', app.controller.shop.login.logout);
    app.resources('/shop/signIn', app.controller.shop.signIn);
    //app.get('/shop/forget', app.controller.shop.login.forget);
    app.get('/shop/reset', app.controller.shop.reset.index);
    app.post('/shop/reset', app.controller.shop.reset.password);
    //商品
    app.get('/shop/goods', app.controller.shop.goods.index);
    app.get('/shop/goods/:id', app.controller.shop.goods.show);
    app.get('/shop/cart', isLoginUser,app.controller.shop.cart.show);
    app.del('/shop/cart/:id',isLoginUser, app.controller.shop.cart.del);
    app.post('/shop/cart',isLoginUser, app.controller.shop.cart.create);
    app.get('/shop/checkout',isLoginUser, app.controller.shop.order.checkout);
    app.post('/shop/order',isLoginUser, app.controller.shop.order.create);
    app.get('/shop/pay/:billNo',isLoginUser, app.controller.shop.pay.index);
    //app.get('/shop/confirmPay/:billNo', isLoginUser,app.controller.shop.pay.confirm);
    app.get('/shop/get', app.controller.shop.goods.get);

    //个人中心
    app.get('/shop/uc', isLoginUser,app.controller.shop.uc.index);
    app.post('/shop/updatePassword',isLoginUser, app.controller.user.updatePassword);
    app.get('/shop/order',isLoginUser, app.controller.shop.order.index);
    app.post('/shop/cancelOrder/:billNo',isLoginUser, app.controller.shop.order.cancel);
    app.get('/shop/orderDetail/:billNo',isLoginUser, app.controller.shop.order.detail);
    app.get('/shop/orderByStatus',isLoginUser, app.controller.shop.order.get);
    app.get('/shop/myProduct',isLoginUser, app.controller.shop.goods.myProduct);
    app.get('/shop/wishlist',isLoginUser, app.controller.shop.wishlist.index);
    app.post('/shop/wishlist',isLoginUser, app.controller.shop.wishlist.create);
    app.del('/shop/wishlist/:id',isLoginUser, app.controller.shop.wishlist.del);

    //联系我们
    app.get('/shop/contact', app.controller.shop.contact.index);
    app.post('/shop/contact', app.controller.shop.contact.create);

    app.get('/shop/subject/:id', app.controller.shop.subject.show);
    app.get('/shop/blog',app.controller.shop.blog.index);
    app.get('/shop/blog/:id', app.controller.shop.blog.detail);
    app.get('/shop/blog/get',app.controller.shop.blog.get);
    app.get('/shop/blogClass',app.controller.shop.blogClass.get);


    //支付API
    app.post('/api/pay/msg', app.controller.paybot.msg);

    //--------------------------------------------------
    // admin管理后台
    //--------------------------------------------------
    app.get('/admin', app.controller.admin.home.index);
    app.post('/admin/login', app.controller.admin.login.login);
    app.post('/admin/logout', app.controller.admin.login.logout);
    //对象统一操作接口
    app.resources('/admin/table', isLoginUser ,app.controller.admin.table);
    app.get('/admin/user/info', isLoginUser ,app.controller.admin.user.info);
    app.get('/admin/goods/list', isLoginUser ,app.controller.admin.goods.list);
    app.get('/admin/goods/:id', isLoginUser ,app.controller.admin.goods.detail);
    app.post('/admin/goods', isLoginUser ,app.controller.admin.goods.create);
    app.del('/admin/goods/:id', isLoginUser ,app.controller.admin.goods.del);
    app.post('/admin/goods/status', isLoginUser ,app.controller.admin.goods.status);
    app.post('/admin/goods/recommend', isLoginUser ,app.controller.admin.goods.recommend);
    app.get('/admin/order/list', isLoginUser ,app.controller.admin.order.list);
    app.post('/admin/order/status', isLoginUser ,app.controller.admin.order.status);
    app.get('/admin/custom/list', isLoginUser ,app.controller.admin.user.list);
    app.post('/admin/custom/status', isLoginUser ,app.controller.admin.user.status);
    app.get('/admin/report', isLoginUser ,app.controller.admin.report.data);
    app.get('/admin/report/detail', isLoginUser ,app.controller.admin.report.detail);

    app.resources('/admin/region',isLoginUser ,app.controller.admin.region);

    //上传文件
    app.post('/admin/upload/:type', isLoginUser ,app.controller.file.upload);
    app.get('/file/download/:id', isLoginUser,app.controller.file.download);

    const ueditor = require('egg-ueditor');
    app.all('/admin/ueditor', ueditor());

};
