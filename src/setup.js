var flexo = {
    isClient: false,
    isServer: false
};

function getDefaultOptions() {
    var defaultOptions = {
        success: function () {},
        error: function (err) {
            throw err;
        }
    };
}

function getErrorOption(options) {
    return { error: options.error || function (err) {
        throw err;
    }};
}

function setOptions(options) {
    var defaultOptions = {
        success: function () {},
        error: function (err) {
            throw err;
        }
    };

    return _.defaults(options, defaultOptions);
}

function noop() {}
function getInsertIndex(attr, val, html) {
    var regex = new RegExp('<[^<]*' + attr + '+=["||\']' + val + '["||\']+.*?>');
    return html.match(regex);
}
function insertIntoHtmlStr(attr, val, html, htmlBuffer) {
    var match = getInsertIndex(attr, val, htmlBuffer);
    var htmlBufferOpen = htmlBuffer.substr(0, match.index + match[0].length);
    var htmlBufferClose = htmlBuffer.substr(match.index + match[0].length);

    htmlBuffer = htmlBufferOpen + html + htmlBufferClose;
    return htmlBuffer;
}

try {
    window;
    flexo.isClient = true;
} catch (e) {
    flexo.isServer = true;
}

if (flexo.isServer) {
    Backbone.View.prototype._ensureElement = noop;
    Backbone.View.prototype.delegateEvents = noop;
    Backbone.View.prototype.undelegateEvents = noop;
}