
module.exports = () => {
    return async function (ctx,next) {
        // 如果 Session 是空的，则不保存
        if (ctx.session.uid) {
            await next();
        } else {
            ctx.session.error = 'Access denied!';
            ctx.body = "AccessDenied";
        }
    };
};