var util = require('util');
servers.Collagen.augment({
    initialize: function(parent, app) {
        parent.call(this, app);
        this.add(function(req, res, next) {
            util.log(util.format('"%s %s HTTP/%s" %s "%s" "%s"', req.method, req.path, req.httpVersion, res.statusCode, req.headers.host, req.headers['user-agent']));
            next();
        });
    }
});
