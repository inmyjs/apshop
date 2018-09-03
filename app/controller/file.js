/**
 * Controller
 * @param app
 */
const path = require('path');
var fs = require("fs")
module.exports = app => {
    return class FileController extends app.Controller {
        async  upload(ctx){
            var me=this;
            var type=ctx.params.type;
            const stream = await ctx.getFileStream();
            var filePath=await ctx.helper.saveFile(stream,type).catch(function (error) {
                console.log(error);
                me.failure("上传失败");
                return;
            });
            this.success("上传成功!",app.config.server+filePath);
        }
        async download(ctx){
            var id=ctx.params.id;
            var doc=await ctx.model.Document.findById(id);
            if(!doc){
                this.failure("下载失败");
                return;
            }
            var filePath=doc.docUrl;//path.join(__dirname,'../files/1_kunoy.jpg');
            ctx.attachment(doc.docName);
            ctx.set('Content-Type', 'application/octet-stream');
            ctx.body = fs.createReadStream(filePath);
        }
    };
};