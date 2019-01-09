/**
 * more.js
 * =======
 *
 * jQuery plugin to implement an AJAX "more" button.
 *
 * Options passed must include a URL to get the data from, an input field selector to get the query value from, a
 * selector for the table to populate, and a function to build the HTML to populate the table with. A var called
 * 'currentPage' must be defined in the same scope of this plugin and is used to get the data as well as incremented
 * on success.
 *
 * Optionally you may specify the AJAX dataType as well as the query parameter and page parameter names. If parameter
 * names are not passed 'q' and 'page' will be assumed respectively. If a dataType is not passed, JSON will be assumed.
 * This plugin depends on the Twitter 'button' bootstrap plugin for the "loading" button functionality but can be
 * disabled by setting 'bootstrap' to 'false'.
 *
 * The return value of the buildEntries function will be the content of the specified table.
 *
 * Copyright (c) 2014 Walker Crouse <walkercrouse@hotmail.com> Licensed MIT
 *
 * @author Walker Crouse
 *
 */
(function ( $ ) {

    /**
     * Thrown when invalid arguments are passed to a function.
     *
     * @param string message
     */
    function IllegalArgumentException(msg) {
        this.msg = msg;
    }

    /**
     * Thrown when a variable that is excepted to be defined is not.
     *
     * @param string message
     */
    function UndefinedException(msg) {
        this.msg = msg;
    }

    $.fn.more = function(options) {

        // make sure currentPage is defined
        if (typeof currentPage == 'undefined') {
            throw new UndefinedException("the variable 'currentPage' MUST be defined in the same scope of this plugin");
        }

        // option defaults
        var defaults = {
            url: null,          // NOT NULL -- URL to fetch resources from
            input: null,        // NULLABLE -- Input field to get query from
            table: null,        // NOT NULL -- Element to populate resources with
            queryParam: 'q',    // NULLABLE -- Parameter name for query string
            pageParam: "page",  // NOT NULL -- Parameter name for page number
            dataType: "json",   // NOT NULL -- AJAX dataType
            buildEntries: null, // NOT NULL -- Function to build HTML from returned data
            bootstrap: false,   // BOOLEAN  -- True if we should enable the "loading button" bootstrap plugin
            before: null,       // NULLABLE -- Function to call before we send the AJAX request
            after: null,        // NULLABLE -- Function to call after we send the AJAX request, regardless of result.
        };
        options = $.extend(defaults, options);

        if (options.table == null) {
            options['table'] = $(this).attr('data-table');
        }

        if (options.input == null) {
            options['input'] = $(this).attr('data-input');
        }

        if (options.url == null) {
            options['url'] = $(this).attr('data-url');
        }

        // argument checking
        var notNull = {
            url: "no url specified to fetch additional resources from",
            table: "no element selector specified to populate additional resources from",
            pageParam: "no parameter name specified to paginate additional resources",
            dataType: "no data type specified to parse the returned data",
            buildEntries: "no function specified to build HTML from returned data"
        };

        // check for nulls
        for (var key in notNull) {
            if (defaults[key] == null) {
                throw new IllegalArgumentException(notNull[key]);
            }
        }

        // fetch additional resources on click
        $(this).click(function() {
            // enable bootstrap loading button if specified
            var btn = $(this);
            if (options.bootstrap) {
                btn.button('loading');
            }

            // build AJAX request
            var request = {
                url: options.url,
                data: {},
                type: "GET",
                dataType: options.dataType,

                success: function(data) {
                    // invoke callback to generate entries from the returned data
                    var table = $(options.table);
                    table.html(table.html() + options.buildEntries(data));
                    currentPage++;
                }
            };

            // pre send
            if (options.before != null) {
                options.before(request);
            }

            // append data
            var data = request['data'];
            if (options.input != null && options.queryParam != null) {
                data[options.queryParam] = $(options.input).val();
            }
            data[options.pageParam] = currentPage+1;

            // send request
            $.ajax(request).always(function() {
                // disable loading button if specified
                if (options.bootstrap) {
                    btn.button('reset');
                }

                // post send
                if (options.after != null) {
                    options.after();
                }
            });
        });
    };

}( jQuery ));