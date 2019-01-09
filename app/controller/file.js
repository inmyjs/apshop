/**
 * Controller
 * @param app
 */
const path = require('path');
let fs = require("fs");
module.exports = app => {
    return class FileController extends app.Controller {
        async  upload(ctx){
            let me=this;
            let docType=ctx.params.type;
            const stream = await ctx.getFileStream();
            let docName=path.basename(stream.filename);
            let filePath=await ctx.helper.saveFile(stream,docType).catch(function (error) {
                console.log(error);
                me.failure("上传失败");
                return;
            });
            //let docUrl='https://'+ctx.host+filePath;
            let docUrl=ctx.protocol+'://'+ctx.host+filePath;
            let doc=await ctx.model.Document.create({
                docUrl,
                docType,
                docName,
            });
            ctx.success("上传成功!",doc);
        }
        async download(ctx){
            let id=ctx.params.id;
            let doc=await ctx.model.Document.findById(id);
            if(!doc){
                ctx.failure("下载失败");
                return;
            }
            let filePath=doc.docUrl;
            ctx.attachment(doc.docName);
            ctx.set('Content-Type', 'application/octet-stream');
            ctx.body = fs.createReadStream(filePath);
        }
    };
};
