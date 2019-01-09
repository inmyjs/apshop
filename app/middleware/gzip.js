/**
 * 压缩
 * @type {isJSON}
 */

const isJSON = require('koa-is-json');
const zlib = require('zlib');
module.exports = options => {
    return async function gzip(ctx,next) {
        await next();
        // 后续中间件执行完成后将响应体转换成 gzip
        let body = this.body;
        if (!body) return;
        // 支持 options.threshold
        if (options.threshold && this.length < options.threshold) return;
        if (isJSON(body)) body = JSON.stringify(body);
        // 设置 gzip body，修正响应头
        const stream = zlib.createGzip();
        stream.end(body);
        this.body = stream;
        this.set('Content-Encoding', 'gzip');
    };
};