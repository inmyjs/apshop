!function () {
    function e(e, t) {
        return l(e || self.document.URL || self.location.href, t || s())
    }

    function s() {
        var e = document.getElementsByTagName("script");
        return e[e.length - 1].src
    }

    function l(e, s) {
        var l = s;
        return /^(\/|\\\\)/.test(s) ? l = /^.+?\w(\/|\\\\)/.exec(e)[0] + s.replace(/^(\/|\\\\)/, "") : /^[a-z]+:/i.test(s) || (e = e.split("#")[0].split("?")[0].replace(/[^\\\/]+$/, ""), l = e + "" + s), t(l)
    }

    function t(e) {
        var s = /^[a-z]+:\/\//.exec(e)[0], l = null, t = [];
        for (e = e.replace(s, "").split("?")[0].split("#")[0], e = e.replace(/\\/g, "/").split(/\//), e[e.length - 1] = ""; e.length;) ".." === (l = e.shift()) ? t.pop() : "." !== l && t.push(l);
        return s + t.join("/")
    }

    var a = window.UEDITOR_HOME_URL || e();
    window.UEDITOR_CONFIG = {
        UEDITOR_HOME_URL: a,
        serverUrl: "/ueditor",
        //toolbars: [["fullscreen", "source", "|", "undo", "redo", "|", "bold", "italic", "underline", "fontborder", "strikethrough", "superscript", "subscript", "removeformat", "formatmatch", "autotypeset", "blockquote", "pasteplain", "|", "forecolor", "backcolor", "insertorderedlist", "insertunorderedlist", "selectall", "cleardoc", "|", "rowspacingtop", "rowspacingbottom", "lineheight", "|", "customstyle", "paragraph", "fontfamily", "fontsize", "|", "directionalityltr", "directionalityrtl", "indent", "|", "justifyleft", "justifycenter", "justifyright", "justifyjustify", "|", "touppercase", "tolowercase", "|", "link", "unlink", "anchor", "|", "imagenone", "imageleft", "imageright", "imagecenter", "|", "simpleupload", "insertimage", "emotion", "scrawl", "insertvideo", "music", "attachment", "map", "gmap", "insertframe", "insertcode", "webapp", "pagebreak", "template", "background", "|", "horizontal", "date", "time", "spechars", "snapscreen", "wordimage", "|", "table", "inserttable", "deletetable", "insertparagraphbeforetable", "insertrow", "deleterow", "insertcol", "deletecol", "mergecells", "mergeright", "mergedown", "splittocells", "splittorows", "splittocols", "charts", "|", "print", "searchreplace", "drafts", "help"]],
        toolbars: [["undo", "redo", "|", "fontsize", "forecolor", "bold", "italic", "underline", "|", "justifyleft", "justifycenter", "justifyright", "justifyjustify", "lineheight", "|", "directionalityltr", "directionalityrtl", "indent", "|", "simpleupload", "insertvideo", "emotion", "|", "backcolor", "autotypeset", "link", "spechars", "source", "|", "searchreplace", "|", "fullscreen","mobile"]],
        fontsize: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 24, 36],
        elementPathEnabled: !1,
        //autoFloatEnabled:false,
        maximumWords: 1e5,
        xssFilterRules: !0,
        inputXssFilter: !0,
        outputXssFilter: !0,
        whitList: {
            a: ["target", "href", "title", "class", "style"],
            abbr: ["title", "class", "style"],
            address: ["class", "style"],
            area: ["shape", "coords", "href", "alt"],
            article: ['style'],
            aside: [],
            audio: ["autoplay", "controls", "loop", "preload", "src", "class", "style"],
            b: ["class", "style"],
            bdi: ["dir"],
            bdo: ["dir"],
            big: [],
            blockquote: ["cite", "class", "style"],
            br: [],
            caption: ["class", "style"],
            center: [],
            cite: [],
            code: ["class", "style"],
            col: ["align", "valign", "span", "width", "class", "style"],
            colgroup: ["align", "valign", "span", "width", "class", "style"],
            dd: ["class", "style"],
            del: ["datetime"],
            details: ["open"],
            div: ["class", "style"],
            dl: ["class", "style"],
            dt: ["class", "style"],
            em: ["class", "style"],
            font: ["color", "size", "face"],
            footer: [],
            h1: ["class", "style"],
            h2: ["class", "style"],
            h3: ["class", "style"],
            h4: ["class", "style"],
            h5: ["class", "style"],
            h6: ["class", "style"],
            header: [],
            hr: [],
            i: ["class", "style"],
            img: ["src", "alt", "title", "width", "height", "id", "_src", "_url", "loadingclass", "class", "data-latex", "style"],
            ins: ["datetime"],
            li: ["class", "style"],
            mark: [],
            nav: [],
            ol: ["class", "style"],
            p: ["class", "style"],
            pre: ["class", "style"],
            s: [],
            section: ["style"],
            small: [],
            span: ["class", "style"],
            sub: ["class", "style"],
            sup: ["class", "style"],
            strong: ["class", "style"],
            table: ["width", "border", "align", "valign", "class", "style"],
            tbody: ["align", "valign", "class", "style"],
            td: ["width", "rowspan", "colspan", "align", "valign", "class", "style"],
            tfoot: ["align", "valign", "class", "style"],
            th: ["width", "rowspan", "colspan", "align", "valign", "class", "style"],
            thead: ["align", "valign", "class", "style"],
            tr: ["rowspan", "align", "valign", "class", "style"],
            tt: [],
            u: [],
            ul: ["class", "style"],
            video: ["autoplay", "controls", "loop", "preload", "src", "height", "width", "class", "style"],
            source: ["src", "type"],
            embed: ["type", "class", "pluginspage", "src", "width", "height", "align", "style", "wmode", "play", 0 / 0, "loop", "menu", "allowscriptaccess", "allowfullscreen", "controls", "preload"],
            iframe: ["src", "class", "height", "width", "max-width", "max-height", "align", "frameborder", "allowfullscreen"]
        }
    }, window.UE = {getUEBasePath: e}
}();
