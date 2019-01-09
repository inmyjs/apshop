/**
 * 路由配置
 * @param app
 */
module.exports = app => {

    //--------------------------------------------------
    // 根据环境加载路由
    //--------------------------------------------------
    if(app.config.env === 'prod'){
        require('./router/router.prod')(app);
    }else{
        require('./router/router.local')(app);
    }
};
