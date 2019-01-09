
/*! http://mths.be/placeholder v2.1.2 by @mathias */
(function(factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function($) {

    // Opera Mini v7 doesn't support placeholder although its DOM seems to indicate so
    var isOperaMini = Object.prototype.toString.call(window.operamini) === '[object OperaMini]';
    var isInputSupported = 'placeholder' in document.createElement('input') && !isOperaMini;
    var isTextareaSupported = 'placeholder' in document.createElement('textarea') && !isOperaMini;
    var valHooks = $.valHooks;
    var propHooks = $.propHooks;
    var hooks;
    var placeholder;
    var settings = {};

    if (isInputSupported && isTextareaSupported) {

        placeholder = $.fn.placeholder = function() {
            return this;
        };

        placeholder.input = true;
        placeholder.textarea = true;

    } else {

        placeholder = $.fn.placeholder = function(options) {

            var defaults = {customClass: 'placeholder'};
            settings = $.extend({}, defaults, options);

            return this.filter((isInputSupported ? 'textarea' : ':input') + '[placeholder]')
                .not('.'+settings.customClass)
                .bind({
                    'focus.placeholder': clearPlaceholder,
                    'blur.placeholder': setPlaceholder
                })
                .data('placeholder-enabled', true)
                .trigger('blur.placeholder');
        };

        placeholder.input = isInputSupported;
        placeholder.textarea = isTextareaSupported;

        hooks = {
            'get': function(element) {

                var $element = $(element);
                var $passwordInput = $element.data('placeholder-password');

                if ($passwordInput) {
                    return $passwordInput[0].value;
                }

                return $element.data('placeholder-enabled') && $element.hasClass(settings.customClass) ? '' : element.value;
            },
            'set': function(element, value) {

                var $element = $(element);
                var $replacement;
                var $passwordInput;

                if (value !== '') {

                    $replacement = $element.data('placeholder-textinput');
                    $passwordInput = $element.data('placeholder-password');

                    if ($replacement) {
                        clearPlaceholder.call($replacement[0], true, value) || (element.value = value);
                        $replacement[0].value = value;

                    } else if ($passwordInput) {
                        clearPlaceholder.call(element, true, value) || ($passwordInput[0].value = value);
                        element.value = value;
                    }
                }

                if (!$element.data('placeholder-enabled')) {
                    element.value = value;
                    return $element;
                }

                if (value === '') {

                    element.value = value;

                    // Setting the placeholder causes problems if the element continues to have focus.
                    if (element != safeActiveElement()) {
                        // We can't use `triggerHandler` here because of dummy text/password inputs :(
                        setPlaceholder.call(element);
                    }

                } else {

                    if ($element.hasClass(settings.customClass)) {
                        clearPlaceholder.call(element);
                    }

                    element.value = value;
                }
                // `set` can not return `undefined`; see http://jsapi.info/jquery/1.7.1/val#L2363
                return $element;
            }
        };

        if (!isInputSupported) {
            valHooks.input = hooks;
            propHooks.value = hooks;
        }

        if (!isTextareaSupported) {
            valHooks.textarea = hooks;
            propHooks.value = hooks;
        }

        $(function() {
            // Look for forms
            $(document).delegate('form', 'submit.placeholder', function() {

                // Clear the placeholder values so they don't get submitted
                var $inputs = $('.'+settings.customClass, this).each(function() {
                    clearPlaceholder.call(this, true, '');
                });

                setTimeout(function() {
                    $inputs.each(setPlaceholder);
                }, 10);
            });
        });

        // Clear placeholder values upon page reload
        $(window).bind('beforeunload.placeholder', function() {
            $('.'+settings.customClass).each(function() {
                this.value = '';
            });
        });
    }

    function args(elem) {
        // Return an object of element attributes
        var newAttrs = {};
        var rinlinejQuery = /^jQuery\d+$/;

        $.each(elem.attributes, function(i, attr) {
            if (attr.specified && !rinlinejQuery.test(attr.name)) {
                newAttrs[attr.name] = attr.value;
            }
        });

        return newAttrs;
    }

    function clearPlaceholder(event, value) {

        var input = this;
        var $input = $(input);

        if (input.value === $input.attr('placeholder') && $input.hasClass(settings.customClass)) {

            input.value = '';
            $input.removeClass(settings.customClass);

            if ($input.data('placeholder-password')) {

                $input = $input.hide().nextAll('input[type="password"]:first').show().attr('id', $input.removeAttr('id').data('placeholder-id'));

                // If `clearPlaceholder` was called from `$.valHooks.input.set`
                if (event === true) {
                    $input[0].value = value;

                    return value;
                }

                $input.focus();

            } else {
                input == safeActiveElement() && input.select();
            }
        }
    }

    function setPlaceholder(event) {
        var $replacement;
        var input = this;
        var $input = $(input);
        var id = input.id;

        // If the placeholder is activated, triggering blur event (`$input.trigger('blur')`) should do nothing.
        if (event && event.type === 'blur') {

            if ($input.hasClass(settings.customClass)) {
                return;
            }

            if (input.type === 'password') {
                $replacement = $input.prevAll('input[type="text"]:first');
                if ($replacement.length > 0 && $replacement.is(':visible')) {
                    return;
                }
            }
        }

        if (input.value === '') {
            if (input.type === 'password') {
                if (!$input.data('placeholder-textinput')) {

                    try {
                        $replacement = $input.clone().prop({ 'type': 'text' });
                    } catch(e) {
                        $replacement = $('<input>').attr($.extend(args(this), { 'type': 'text' }));
                    }

                    $replacement
                        .removeAttr('name')
                        .data({
                            'placeholder-enabled': true,
                            'placeholder-password': $input,
                            'placeholder-id': id
                        })
                        .bind('focus.placeholder', clearPlaceholder);

                    $input
                        .data({
                            'placeholder-textinput': $replacement,
                            'placeholder-id': id
                        })
                        .before($replacement);
                }

                input.value = '';
                $input = $input.removeAttr('id').hide().prevAll('input[type="text"]:first').attr('id', $input.data('placeholder-id')).show();

            } else {

                var $passwordInput = $input.data('placeholder-password');

                if ($passwordInput) {
                    $passwordInput[0].value = '';
                    $input.attr('id', $input.data('placeholder-id')).show().nextAll('input[type="password"]:last').hide().removeAttr('id');
                }
            }

            $input.addClass(settings.customClass);
            $input[0].value = $input.attr('placeholder');

        } else {
            $input.removeClass(settings.customClass);
        }
    }

    function safeActiveElement() {
        // Avoid IE9 `document.activeElement` of death
        try {
            return document.activeElement;
        } catch (exception) {}
    }
}));

/*tab切换*/
(function ($) {
  $.fn.zTab=function(options) {
   var dft={
      tabnav:'.tab-nav',          //导航按钮元素
      tabcon:'.tab-con',          //被切换元素
      trigger:'mouseenter', //触发方式，默认点击触发
      curName:'active', //给高亮设置类名
      removeMod:null,     //改为触发时移除导航的类名
      cur:0,                //初始高亮的顺序，默认第一个
      delay:0,              //触发延时
      auto:null,           //是否自动改变
      after: null ,      //回调
      first:null             //首次加载时执行
    };

    var ops=$.extend(dft,options);
    return this.each(function () {
      var self=$(this),
      nav=self.find(ops.tabnav),
      con=self.find(ops.tabcon),
      navBtn=nav.children(),
      num=navBtn.length,
      timer=null,
      timer2=null,
      isInit=false;

      //初始化执行
      init();

      navBtn.on(ops.trigger,function () {
        ops.cur=$(this).index();
        clearTimeout(timer);
        clearTimeout(timer2);
        timer=setTimeout(run,ops.delay);
        return false;
      });

      navBtn.on('mouseleave',function () {
        clearTimeout(timer);
        if (ops.auto) {
          timer2=setInterval(auto,ops.auto.interval);
        }
      });
      //
      function init () {
        ops.trigger=='click'?ops.trigger='click':ops.trigger='mouseenter click'; //导航触发方式判定
        run();
        if (ops.auto) {
          timer2=setInterval(auto,ops.auto.interval);
        }
        else {
          run();
        }

        if(ops.first){
          ops.first(self,ops.cur,num);
        }

        isInit=true;
      }
      //
      function run () {
        if (ops.removeMod) {
          navBtn.addClass(ops.curName).eq(ops.cur).removeClass(ops.curName); //
        }
        else {
          navBtn.removeClass(ops.curName).eq(ops.cur).addClass(ops.curName); //
        }

          con.hide().eq(ops.cur).show(); //

         if(ops.after&&isInit){
          ops.after(ops.cur,ops);
        }
      }
      //
      function auto () {
        ops.cur+=1;
        if (ops.cur==num) {ops.cur=0;}
        run();
      }

    });
}
})(jQuery);

$.fn.countTo = function (options) {
        options = options || {};

        return $(this).each(function () {
            // set options for current element
            var settings = $.extend({}, $.fn.countTo.defaults, {
                from:            $(this).data('from'),
                to:              $(this).data('to'),
                speed:           $(this).data('speed'),
                refreshInterval: $(this).data('refresh-interval'),
                decimals:        $(this).data('decimals')
            }, options);

            // how many times to update the value, and how much to increment the value on each update
            var loops = Math.ceil(settings.speed / settings.refreshInterval),
                increment = (settings.to - settings.from) / loops;

            // references & variables that will change with each update
            var self = this,
                $self = $(this),
                loopCount = 0,
                value = settings.from,
                data = $self.data('countTo') || {};

            $self.data('countTo', data);

            // if an existing interval can be found, clear it first
            if (data.interval) {
                clearInterval(data.interval);
            }
            data.interval = setInterval(updateTimer, settings.refreshInterval);

            // initialize the element with the starting value
            render(value);

            function updateTimer() {
                value += increment;
                loopCount++;

                render(value);

                if (typeof(settings.onUpdate) == 'function') {
                    settings.onUpdate.call(self, value);
                }

                if (loopCount >= loops) {
                    // remove the interval
                    $self.removeData('countTo');
                    clearInterval(data.interval);
                    value = settings.to;

                    if (typeof(settings.onComplete) == 'function') {
                        settings.onComplete.call(self, value);
                    }
                }
            }

            function render(value) {
                var formattedValue = settings.formatter.call(self, value, settings);
                $self.html(formattedValue);
            }
        });
    };

    $.fn.countTo.defaults = {
        from: 0,               // the number the element should start at
        to: 0,                 // the number the element should end at
        speed: 1000,           // how long it should take to count between the target numbers
        refreshInterval: 100,  // how often the element should be updated
        decimals: 0,           // the number of decimal places to show
        formatter: formatter,  // handler for formatting the value before rendering
        onUpdate: null,        // callback method for every time the element is updated
        onComplete: null       // callback method for when the element finishes updating
    };

    function formatter(value, settings) {
        return value.toFixed(settings.decimals);
    }


var zAction = function () {
  //namespace
  var action = {}

  var SELECTOR = '[data-action]'
  var _actionList = {}

  //util
  function _getActionName($elem) {
    var result = $elem.data('action') || ''
    if (!result) {
      var href = $.trim($elem.attr('href'))
      if (href && href.indexOf('#') === 0) result = href
    }
    return _formatActionName(result)
  }
  function _formatActionName(s) {
    return s ? $.trim(String(s).replace(/^[#!\s]+/, '')) : ''
  }

  function _init() {
    var $wrapper = $(document.body || document.documentElement)
    $wrapper.on('click', SELECTOR, function (ev) {
      //notice: default click behavior will be prevented.
      ev.preventDefault()

      var $elem = $(this)
      var actionName = _getActionName($elem)
      _handle(actionName, this)
    })
  }
  function _handle(actionName, context) {
    if (!actionName) {
      /** DEBUG_INFO_START **/
      console.warn('[Action] Empty action. Do nothing.')
      /** DEBUG_INFO_END **/
      return
    }
    var fn = _actionList[actionName]
    if (fn && $.isFunction(fn)) {
      /** DEBUG_INFO_START **/
      // console.log('[Action] Executing action `%s`.', actionName)
      /** DEBUG_INFO_END **/
      return fn.call(context || window)
    } else {
      /** DEBUG_INFO_START **/
      console.error('[Action] Not found action `%s`.', actionName)
      /** DEBUG_INFO_END **/
    }
  }

  //api
  action.add = function (actionSet) {
    if ($.isPlainObject(actionSet)) {
      $.each(actionSet, function (key, value) {
        var actionName = _formatActionName(key)
        if (actionName) {
          if ($.isFunction(value)) {
            /** DEBUG_INFO_START **/
            if (_actionList[actionName]) {
              console.warn('[Action] The existed action `%s` has been overridden.', actionName)
            }
            /** DEBUG_INFO_END **/

            _actionList[actionName] = value
          } else {
            /** DEBUG_INFO_START **/
            console.error('[Action] The function for action `%s` is invalid.', actionName)
            /** DEBUG_INFO_END **/
          }
        } else {
          /** DEBUG_INFO_START **/
          console.error('[Action] The action name `%s` is invalid.', key)
          /** DEBUG_INFO_END **/
        }
      })
    } else {
      /** DEBUG_INFO_START **/
      console.warn('[Action] Param must be a plain object.')
      /** DEBUG_INFO_END **/
    }
  }
  action.trigger = function (actionName, context) {
    return _handle(_formatActionName(actionName), context)
  }

  //init
  _init()

  /** DEBUG_INFO_START **/
  //exports for unit test
  action.__actionList = _actionList
  action.__getActionName = _getActionName
  action.__formatActionName = _formatActionName
  /** DEBUG_INFO_END **/

  //exports
  return action
}();

$(function() {
    //placeholder兼容
    $('input, textarea').placeholder();

    zAction.add({
      'shopd-type':function () {
          var faitem=$(this).parent();
          if (faitem.hasClass('active')) {
            faitem.removeClass('active');
            $(this).siblings('.c-type').slideDown(200);
          }
          else {
            faitem.addClass('active');
            $(this).siblings('.c-type').slideUp(200);
          }
      }

    });

    //商品店铺搜索切换效果
    $('.search-switch').on('click','.active',function () {
        var prev=$(this).prev().addClass('active');
        $(this).removeClass('active');
        $(this).insertBefore(prev);
    });
});