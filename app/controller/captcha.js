/**
 * Controller
 * @param app
 */


module.exports = app => {
    return class UserController extends app.Controller {
        async index(ctx){
            let {text,data}=ctx.helper.get_captcha();
            ctx.session.captcha=text;
            ctx.type='image/svg+xml';
            ctx.body=String(data);
        }
    };
};
