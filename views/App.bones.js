// Starts routing on client
// ------------------------
var start = _.once(function() {
    var bypass = true,
        _loadUrl = Backbone.History.prototype.loadUrl;

    Backbone.History.prototype.loadUrl = function(e) {
        if (bypass) {
            bypass = false;
            return;
        }
        _loadUrl.call(this, e);
    }

    Bones.start({pushState: true, root: ""});
});

// Topmost view
// ------------
view = Backbone.View.extend({
    _ensureElement: function() {
        this.el = $('body');
    }
});

// Registers event handler for all click events
// --------------------------------------------
view.prototype.events = {
    'click a': 'routeClick'
};

// Routes a click event
// --------------------
view.prototype.routeClick = function(ev) {
    if (window.currentKeys && _.size(window.currentKeys)) {
        return true;
    }
    // We only route client side if the browser supports push state.
    // The check here is borrowed from Backbone.
    if (window.history && window.history.pushState) {
        var href = $(ev.currentTarget).get(0).getAttribute('href', 2);
        if (href) return view.route(href);
    }
    return true;
};

// Routes a path
// -------------
view.route = function(path) {
    start();
    if (path.charAt(0) === '/') {
        var matched = _.any(Backbone.history.handlers, function(handler) {
            if (handler.route.test(path)) {
                Backbone.history.navigate(path, true);
                return true;
            }
        });
        return !matched;
    }
    return true;
};
