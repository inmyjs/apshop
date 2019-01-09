
module.exports = () => {
    return async function (ctx,next) {
        // 如果 Session 是空的，则不保存
        if (ctx.session.uid) {
            await next();
        } else {
            if (ctx.acceptJSON) {
                ctx.session.error = 'Access denied!';
                ctx.body = "AccessDenied";
            }else{
                let path=ctx.request.path;
                let first=path.split('/')[1];
                ctx.session.error = 'Access denied!';
                let redi='/';
                switch (first) {
                    case 'admin':
                        redi='/admin';
                        break;
                    case 'shop':
                        redi='/shop/login';
                        break;
                    case 'wx':
                        redi='/wx/login';
                        break;
                }
                ctx.redirect(redi);
            }
        }
    };
};
