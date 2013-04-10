server = Bones.Server.extend({
    initialize: function(app) {
        this.add(function(req, res, next) {
            // Initialize Collagen as an empty object on every request
            Collagen = {};
            next();
        });
    }
});

// Wrapper around express.all to skip static files when adding servers
server.prototype.add = function(route, middleware) {
    if ('string' != typeof route) {
        middleware = route, route = /^\/(?!assets).*/;
    }
    this.all.call(this, route, middleware);
}
