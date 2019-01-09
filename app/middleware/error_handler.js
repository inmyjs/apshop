/**
 * 统一错误处理
 * @returns {Function}
 */
module.exports = () => {
    return async function (ctx,next) {
        try {
            await next();
        } catch (err) {
            // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
            ctx.app.emit('error', err, ctx);

            const status = err.status || 500;
            // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
            const error = status === 500 && ctx.app.config.env === 'prod'
                ? '服务器异常，请联系客服。'
                : err.message;
            if (ctx.acceptJSON) {
                ctx.body = {
                    success: false,
                    msg:error,
                    result:null,
                };
                if (status === 422) {
                    ctx.body.detail = err.errors;
                }
            } else {
                await ctx.render('500',{msg:JSON.stringify(error)});
            }
            ctx.status = 200;
        }
    };
};