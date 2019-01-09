/**
 * 调用参数,方法如:$('#more').more({'url': 'data.php'});
 * limit  :'10'           每次显示记录数
 * url :'comments.php'     请求后台的地址
 * data:{},                自定义参数
 * template:'.single_item' html记录DIV的class属性
 * trigger :'#get_more'    触发加载更多记录的class属性
 * scroll  :'false'        是否支持滚动触发加载
 * offset  :'100'          滚动触发加载时的偏移量
 */
(function($) {
    var target = null;
    var lock = false;
    var variables = {
        'page': 1
    };
    var settings = {
        'limit': 5,
        'url': '',
        'template': '',
        'emptyTemplate': '',
        'data':{},
        'trigger': '#page_more',
        'scroll': false,
        'offset': 100
    };
    var methods = {
        init: function(options) {
            return this.each(function() {
                if (options) {
                    $.extend(settings, options);
                }
                $(this).append('<div id="waitbox"><p>载入中..</p></div>');

                target = $(this);
                if (!settings.scroll) {
                    $(this).find(settings.trigger).bind('click.more', methods.get_data);
                } else {
                    //开始监控滚动栏scroll
                    $(window).scroll(function(){
                        var scrollTop = $(this).scrollTop();
                        var scrollHeight = $(document).height();
                        var windowHeight = $(this).height();
                        if(scrollTop + windowHeight == scrollHeight){
                            target.more('get_data');
                        }
                    });
                }
                target.more('get_data');
            });
        },
        remove: function() {
            target.children(settings.trigger).unbind('.more');
            target.unbind('.more');
            target.children(settings.trigger).remove();
        },
        set_param:function (param) {
            settings.data=param;
        },
        reset:function () {
            variables.page=0;
            settings.data={};
            target.empty();
        },
        add_elements: function(data) {
            var root = target;
            var counter = data.length;
            if (counter == 0) {
                if (variables.page == 0)
                    root.append(Ap.util.renderTemplate(settings.emptyTemplate, this));
                else
                    root.append("<div id='load_more'><p>----------到底啦----------</p></div>");
            } else {
                $(data).each(function () {
                    root.append(Ap.util.renderTemplate(settings.template, this));
                });
                root.append("<div id='load_more'><p>----------下滑加载更多----------</p></div>");
                variables.page++;
            }
            if (counter < settings.limit)
                methods.remove();
        },
        get_data: function() {
            var ile;
            lock = true;
            if (typeof (arguments[0]) == 'number')
                ile = arguments[0];
            else {
                ile = settings.limit;
            }
            var postdata = settings.data;
            postdata['page'] = variables.page;
            postdata['limit'] = ile;
            Ap.request.get(settings.url, postdata, function(res) {
                if(res.success){
                    lock = false;
                    $("#waitbox").remove();
                    $("#load_more").remove();
                    methods.add_elements(res.result);

                }else
                    Ap.msg.error(res.msg);
            });
        }
    };
    $.fn.more = function(method) {
        if (methods[method])
            return methods[ method ].apply(this, Array.prototype.slice.call(arguments, 1));
        else if (typeof method == 'object' || !method)
            return methods.init.apply(this, arguments);
        else
            $.error('Method ' + method + ' does not exist!');
    }
})(jQuery)