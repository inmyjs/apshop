/**
 *
 * @returns {Function}
 */
let fs = require("fs");
module.exports = () => {
    return async function (ctx,next) {
        /* 安装检测 */
        if (!fs.existsSync(ctx.app.root_path+'/data/install.lock')) {
            ctx.redirect('/install');
        }
    };
};
