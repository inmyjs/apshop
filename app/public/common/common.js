/**
 * 前端公共方法
 */

var public_key="-----BEGIN PUBLIC KEY-----\n" +
    "MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgGCG1hRBi7GOWftJF5sHc4at+IVx\n" +
    "ZUf/mjB2pPS3JCgi3GJn9hbpGdwV08TlSAK0o55gHLfTKEShunEtqZ7i6zrIF714\n" +
    "qntmSmXOFWHzmQqHaRGpown/5hsjQ4VsLTykYAxaImqNKBxyQ92tCPxRLmnTAunL\n" +
    "K29Es5n4bayCITQzAgMBAAE=\n" +
    "-----END PUBLIC KEY-----";

var ctoken = $.cookies.get('ctoken');
function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}
$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader('x-csrf-token', ctoken);
        }
    }
});

var Ap={};
/**
 * 封装ajax请求
 */
Ap.request={
    ajax:function(url,data,type,successCallback,errorCallback,contentType){
        data = (data==null || data=="" || typeof(data)=="undefined")? {"date": new Date().getTime()} : data;
        var ajax = {
            type: type,
            url: url,
            data:data,
            dataType:"json",
            success: function (result) {
                if(jQuery.isFunction(successCallback))
                    successCallback(result);
                else if("GET"!=type){
                   Ap.msg.success(result.msg);
                }

            },
            error: function (XMLHttpRequest,msg,exception) {
                Ap.loading.end();
                if(XMLHttpRequest.responseText=="AccessDenied"){
                    Ap.msg.confirm("登录方可操作，快去登录吧！",function (res) {
                        if(res)window.location="/login";
                    });
                    return;
                }
                if(jQuery.isFunction(errorCallback))
                    errorCallback(XMLHttpRequest,msg,exception);
                else{
                    Ap.msg.error(exception);
                }
            }
        };
        if(typeof(contentType) !== "undefined"){
            $.extend(ajax, {
                contentType:contentType,
                data:JSON.stringify(data)
            });
        }
        $.ajax(ajax);
    },
    post:function(url,data,successCallback,errorCallback){
        this.ajax(url,data,"POST",successCallback,errorCallback);
    },
    postJson:function(url,data,successCallback,errorCallback){
        this.ajax(url,data,"POST",successCallback,errorCallback,"application/json");
    },
    get:function(url,data,successCallback,errorCallback){
        this.ajax(url,data,"GET",successCallback,errorCallback);
    },
    del:function(url,data,successCallback,errorCallback){
        this.ajax(url,data,"DELETE",successCallback,errorCallback);
    }
};

/**
 * 提示框统一
 * 使用jquery.alertify
 * @type {{}}
 */
alertify.set({
    labels : {
        ok   : "确认",
        cancel : "取消"
    },
    delay : 5000,
    buttonReverse : false,
    buttonFocus  : "ok"
});
Ap.msg={
    alert:function (msg,fn) {
        alertify.alert(msg,fn);
    },
    confirm:function (msg,fn) {
        alertify.confirm(msg,fn);
    },
    success:function (msg) {
        alertify.success(msg);
    },
    error:function (msg) {
        alertify.error(msg);
    },
    warning:function (msg) {
        alertify.error(msg);
    }
}

/**
 * 统一进度条
 * @type {{start: Ap.loading.start, end: Ap.loading.end}}
 */
Ap.loading={
    /**
     * 打开数据加载进度框
     */
    start :function(msg) {
        $(".ap-loading").show();
        msg=msg?msg:"正在加载... ...";
        $("#ap_loading_title").html(msg);
    },
    end : function () {
        $(".ap-loading").hide();
    }
};

/**
 * 基础工具类
 * @type
 */
Ap.util={
    subDropdown:function (obj) {
        $(obj).toggleClass('plus');
        $(obj).toggleClass('minus');
        $(obj).parent().find('ul').slideToggle();
    },
    //渲染模板
    renderTemplate:function (template,data) {
        let parse = eval(this.compile(template));
        return parse(data);
    },
    //编译模板
    compile:function(template) {
        const evalExpr = /<%=(.+?)%>/g;
        const expr = /<%([\s\S]+?)%>/g;

        template = template
            .replace(evalExpr, '`); \n  echo( $1 ); \n  echo(`')
            .replace(expr, '`); \n $1 \n  echo(`');

        template = 'echo(`' + template + '`);';

        let script =
            `(function parse(data){
            let output = "";

            function echo(html){
                output += html;
             }

        ${ template }

         return output;
        })`;

        return script;
    },
    /**
     * 获取form表单的值
     * @param form
     * @returns {{}}
     */
    getFormJson:function (form) {
        var o = {};
        var a = $(form).serializeArray();
        $.each(a, function () {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    },
    getCurrentDateTime:function(){
        var d = new Date();
        return d.format("yyyy-MM-dd hh:mm:ss");
    },
    getCurrentDate:function(){
        var d = new Date();
        return d.format("yyyy-MM-dd");
    },
    getCurrentDateYYYYMM:function(){
        var d = new Date();
        d.setMonth(d.getMonth() + 1);
        return d.format("yyyyMM");
    },
    //比较两个时间
    compareDate:function(date,value) {
        var mydate = new Date(date);
        var nowdate = new Date();
        mydate.setHours(parseInt(mydate.getHours())+parseInt(value));
        if (mydate.getTime() <= nowdate.getTime()) {
            return -1;
        }
        return 1;
    },
    /**
     * 当前时间戳
     * @return <int>        unix时间戳(秒)
     */
    curTime: function(){
        return Date.parse(new Date())/1000;
    },
    /**
     * 日期 转换为 Unix时间戳
     * @param <string> 2014-01-01 20:20:20  日期格式
     * @return <int>        unix时间戳(秒)
     */
    dateToUnix: function(string) {
        var f = string.split(' ', 2);
        var d = (f[0] ? f[0] : '').split('-', 3);
        var t = (f[1] ? f[1] : '').split(':', 3);
        return (new Date(
            parseInt(d[0], 10) || null,
            (parseInt(d[1], 10) || 1) - 1,
            parseInt(d[2], 10) || null,
            parseInt(t[0], 10) || null,
            parseInt(t[1], 10) || null,
            parseInt(t[2], 10) || null
        )).getTime() / 1000;
    },
    /**
     * 时间戳转换日期
     * @param <int> unixTime    待时间戳(秒)
     * @param <bool> isFull    返回完整时间(Y-m-d 或者 Y-m-d H:i:s)
     * @param <int>  timeZone   时区
     */
    unixToDate: function(unixTime,timeZone) {
        if (typeof (timeZone) == 'number')
        {
            unixTime = parseInt(unixTime) + parseInt(timeZone) * 60 * 60;
        }
        var time = new Date(unixTime * 1000);
        return time.format("yyyy-MM-dd hh:mm:ss");
    },
    //阻止事件冒泡
    stopPropagation : function() {
        var evt = this.getEvent();
        if (evt.stopPropagation) {
            evt.stopPropagation();
        } else {
            evt.cancelBubble = true;
        }
    },
    // 获取event
    getEvent:function() {
        if (document.all)
            return window.event;
        func = getEvent.caller;
        while (func != null) {
            var arg0 = func.arguments[0];
            if (arg0) {
                if ((arg0.constructor == Event || arg0.constructor == MouseEvent)
                    || (typeof (arg0) == "object" && arg0.preventDefault && arg0.stopPropagation)) {
                    return arg0;
                }
            }
            func = func.caller;
        }
        return null;
    },
    getParam:function() {
        try{
            var url = window.location.href;
            var result = url.split("?")[1];
            var keyValue = result.split("&");
            var obj = {};
            for (var i = 0; i < keyValue.length; i++) {
                var item = keyValue[i].split("=");
                obj[item[0]] = item[1];
            }
            return obj;
        }catch(e){
            console.warn("There has no param value!");
        }
    }
}