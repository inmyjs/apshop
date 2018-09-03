/**
 * Controller
 * @param app
 */

const JSEncrypt = require('node-jsencrypt');
module.exports = app => {
    return class ResetController extends app.Controller {
        async password(ctx){
            const {content,act,token} = ctx.request.body;
            const jsEncrypt = new JSEncrypt();
            jsEncrypt.setPrivateKey(app.config.private_key);
            var _content = jsEncrypt.decrypt(content);
            if (!_content) {
                this.failure("验证失败!");
                return;
            }
            var json = JSON.parse(_content);
            console.log(json);
            const {email,password} = json;
            const userLogin=await ctx.model.UserLogin.updatePassword(email,password);
            if(!userLogin){
                this.failure("密码修改失败!");
                return;
            }
            if(act=="F"){
                await ctx.model.EmailValid.update({validStatus:"S"},{where:{token}});
            }
            this.success("密码修改成功!");
        }
        async index(ctx){
            var data= await this.getUserInfo();
            await ctx.render('shop/template/'+app.config.viewTemplate+'/change-password',data);
        }
    };
};