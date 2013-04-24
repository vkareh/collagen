server = servers.Middleware.augment({
    initialize: function(parent, app) {
        parent.call(this, app);
        this.use(new servers.Collagen(app));
    }
});

// Wrapper around express app.use to skip static files when mounting servers
var use = server.prototype.use;
server.prototype.use = function(route, fn) {
    if ('string' === typeof route) {
        return use.call(this, route, fn);
    }
    fn = route;
    use.call(this, function(req, res, next) {
        if (/^\/(?!assets).*/.test(req.path)) {
            if ('function' === typeof fn) {
                return fn(req, res, next);
            }
            return fn.handle(req, res, next);
        }
        next();
    });
}
