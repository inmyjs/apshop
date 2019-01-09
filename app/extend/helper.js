/**
 * 全部独立函数
 * @type
 */
const moment = require('moment');
const fs = require('fs');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const svgCaptcha = require('svg-captcha');
const crypto = require("crypto");
const path = require('path');
module.exports = {
    toCamelCaseVar(variable){
        let reg=/_+(\w)/g;
        let str=variable.replace(reg,function(){
            if(arguments[2])return (arguments[1]).toUpperCase();
            else return arguments[0];
        });
        return str;
    },
    note(note,log){
        if(!note)
            note=''
        return `${note}\n${moment().format("YYYY-MM-DD HH:mm:ss")}  ${log}`;
    },
    saveFile(stream,type){
        let app=this.app;
        return new Promise((resolve,reject)=>{
            let filePath='/public/upload/'+type+"/"+ path.basename(stream.filename);
            const fileName = app.root_path+'/app'+filePath;
            const ws=fs.createWriteStream(fileName);
            stream.pipe(ws);
            stream.on('error',reject);
            stream.on('end',resolve(filePath));
        });
    },
    get_captcha(){
        return svgCaptcha.createMathExpr({color:true});
    },
    relativeTime(time){
        return moment(new Date(time * 1000)).fromNow();
    },
    formatTime(time,format){
        return moment(time).format(format);
    },
    currentParam(param){
        return this.ctx.query[param];
    },
    goodsIsNew(date){
        let _date=moment(date).add(3, 'd');
        return moment().isBefore(_date);
    },
    base64_encode(file){
        // read binary data
        let bitmap = fs.readFileSync(file);
        // convert binary data to base64 encoded string
        return new Buffer(bitmap).toString('base64');
    },
    base64_decode(base64str, file){
        // create buffer object from base64 encoded string, it is important to tell the constructor that the string is base64 encoded
        let bitmap = new Buffer(base64str, 'base64');
        // write buffer to file
        fs.writeFileSync(file, bitmap);
        console.log('******** File created from base64 encoded string ********');
        return true;
    },
    //base64编码
    str2base64(str){
        let b = new Buffer(str);
        return b.toString('base64');
    },
    //base64解码
    base642str(str){
        let b = new Buffer(str, 'base64');
        return b.toString();
    },
    //加密
    cryptoStr(str){
        let cipher=crypto.createCipher("aes128","apshop147852");
        let encrypted=cipher.update(str,"utf8","hex");
        encrypted+=cipher.final("hex");
        return encrypted;
    },
    //解密
    decryptoStr(str){
        let decipher=crypto.createDecipher("aes128","apshop147852");
        let decrypted=decipher.update(str,"hex","utf8");
        decrypted+=decipher.final("utf8");
        return decrypted;
    },
    /**
     * @param {String} recipient 收件人
     * @param {String} subject 发送的主题
     * @param {String} html 发送的html内容
     */
    send(obj) {
        let config=this.app.config;
        let smtpTransport2 = nodemailer.createTransport(smtpTransport({
            service: config.email.service,
            auth: {
                user: config.email.user,
                pass: config.email.pass
            }
        }));
        smtpTransport2.sendMail({
            from: config.email.user,
            to: obj.to,
            subject: obj.title,
            html: obj.html

        }, function (error, response) {
            if(error){
                console.log(error);
                if(obj.error)
                    obj.error();
            }else{
                console.log("Message sent: " + response.message);
                if(obj.success)
                    obj.success();
            }
            smtpTransport2.close();
        });
    },
    sendValidate(obj){
        obj.html=`<p><span id="9999" style="display: none !important; font-size:0; line-height:0"> </span></p><p>&nbsp;</p>
    <p>&nbsp;</p>
    <div style="width:100%; max-width:640px; margin:0 auto;">
        <div style="padding:0 25px; height:100px; background-color:#FF6C2C; color:#fff;">
            <div style=" display:inline-block; vertical-align:middle; padding-right:10px; margin-right:10px; border-right:1px solid #fff; float:left; margin-top:35px;"><img src="javascript:;" style="max-width:105px; max-height:24px;"></div>
            <span style="display:inline-block; height:24px; margin-top:35px; line-height:24px; float:left; font-size:16px;">开发如此简单</span></div>
        <div style="padding:35px 25px; font-size:16px;">
            <h4 style="font-size:16px; color:#4A4A4A; font-weight:normal; padding:0; margin:0; padding-bottom:20px; ">点击下面链接以完成验证</h4>
            <p style="padding:10px 35px; line-height:26px; word-break:break-all;"><a style="display:inline-block; padding:4px 15px; background-color:#FF6C2C; color:#fff; text-decoration:none; margin-bottom:15px;" href="${obj.href}" target="_blank">立即验证</a><br>
                <a href="${obj.href}" target="_blank">${obj.href} </a></p>
            <div style="text-align:right; font-size:14px; margin-top:50px;">Inmyjs工作室</div>
        </div>
        <div style="padding:0 25px; background-color:#F6F6F6; color:#979797; font-size:14px;">
            <p style="padding:20px 0; line-height:20px;">如果您并未发过此请求，可能是因为其他用户在验证邮箱时误输入了您的邮箱地址而使你收到了 这封邮件，请忽略此封邮件，无需进行任何操作。</p>
            <p style="padding:5px 0; line-height:24px">如有任何问题，请与我们联系，我们将尽快为你解答。<br>
                Email:<span style="color:#FF6C2C;"><a href="573391755@qq.com" target="_blank">573391755@qq.com</a></span>&nbsp;&nbsp; 电话：<span><span style="color:#FF6C2C; border-bottom:1px dashed #ccc;z-index:1" t="7" onclick="return false;" data=""></span></span></p>
        </div>
    </div>
    <br><br>`;
        this.send(obj);
    },
    sendContent(obj){
        obj.html=`<p><span id="9999" style="display: none !important; font-size:0; line-height:0"> </span></p><p>&nbsp;</p>
    <p>&nbsp;</p>
    <div style="width:100%; max-width:640px; margin:0 auto;">
        <div style="padding:0 25px; height:100px; background-color:#FF6C2C; color:#fff;">
            <div style=" display:inline-block; vertical-align:middle; padding-right:10px; margin-right:10px; border-right:1px solid #fff; float:left; margin-top:35px;"><img src="javascript:;" style="max-width:105px; max-height:24px;"></div>
            <span style="display:inline-block; height:24px; margin-top:35px; line-height:24px; float:left; font-size:16px;">系统通知</span></div>
        <div style="padding:35px 25px; font-size:16px;">
            <h4 style="font-size:16px; color:#4A4A4A; font-weight:normal; padding:0; margin:0; padding-bottom:20px; ">${obj.name}</h4>
            <p style="padding:10px 35px; line-height:26px; word-break:break-all;">${obj.content}</p>
            <div style="text-align:right; font-size:14px; margin-top:50px;">Inmyjs工作室</div>
        </div>
        <div style="padding:0 25px; background-color:#F6F6F6; color:#979797; font-size:14px;">
            <p style="padding:20px 0; line-height:20px;">如果您并未发过此请求，可能是因为其他用户在验证邮箱时误输入了您的邮箱地址而使你收到了 这封邮件，请忽略此封邮件，无需进行任何操作。</p>
            <p style="padding:5px 0; line-height:24px">如有任何问题，请与我们联系，我们将尽快为你解答。<br>
                Email:<span style="color:#FF6C2C;"><a href="573391755@qq.com" target="_blank">573391755@qq.com</a></span>&nbsp;&nbsp; 电话：<span><span style="color:#FF6C2C; border-bottom:1px dashed #ccc;z-index:1" t="7" onclick="return false;" data=""></span></span></p>
        </div>
    </div>
    <br><br>`;
        this.send(obj);
    }
}
