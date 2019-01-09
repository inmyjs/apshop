/**
 * 基于vue动态分页
 */
(function($) {
    var taget=null;
    var page=1;
    var app=null;
    var settings = {
        limit: 5,
        url: '',
        template: '',
        emptyTemplate: '',
        params:{},
        trigger: '#page_more',
        scroll: true,
        vue:{}
    };
    var methods = {
        init: function(options) {
            var me=this;
            if(taget==null){
                Ap.msg.error("列表容器错误");
                return null;
            }
            if (options) {
                $.extend(settings, options);
            }
            $.extend(settings.vue, {
                el: taget[0],
                data: {
                    load_more_msg:'下滑加载更多',
                    listData: []
                },
                methods: {
                    beforeEnter: function (el) {
                        el.style.opacity = 0
                    },
                    enter: function (el, done) {
                        var offset=(Number(el.dataset.index)+1)% Number(settings.limit);
                        if(offset==0)
                            offset=Number(settings.limit);
                        var delay = offset * 150
                        setTimeout(function () {
                            $(el).velocity(
                                { opacity: 1 },
                                { complete: done }
                            )
                        }, delay)
                    },
                }
            });
            app=new Vue(settings.vue);
            if (settings.scroll) {
                //开始监控滚动栏scroll
                $(window).scroll(function(){
                    var scrollTop = $(this).scrollTop();
                    var scrollHeight = $(document).height();
                    var windowHeight = $(this).height();
                    if(scrollTop + windowHeight== scrollHeight){
                        page++;
                        me.getData();
                    }
                });
            }
            me.getData();
            return me;
        },
        getData: function() {
            //taget.append('<div id="waitbox"><p>载入中..</p></div>');
            var data = settings.params;
            data['page'] = page;
            data['limit'] = settings.limit;
            Ap.request.get(settings.url,data,function (res) {
                //$("#waitbox").remove();
                if(res.success){
                    if(page>1){
                        if(res.result.length==0){
                            app.load_more_msg='已经到底啦';
                        }else{
                            app.load_more_msg='下滑加载更多';
                        }
                        app.listData=app.listData.concat(res.result);
                    }else{
                        app.listData=res.result;
                    }
                }else
                    Ap.msg.error(res.msg);
            });
        },
        refreshData: function(params) {
            if(params)
                $.extend(settings.params, params);
            page=1;
            app.load_more_msg='下滑加载更多';
            this.getData();
        }
    };
    $.fn.more = function() {
        taget=this;
        return methods.init.apply(methods, arguments);
    }
})(jQuery)