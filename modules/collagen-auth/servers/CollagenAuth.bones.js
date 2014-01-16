// Authentication middleware
// -------------------------
// Factory function that returns an Express session-based authentication
// middleware. Automatically adds the Connect session middleware.
server = servers.Collagen.augment({
    initialize: function(parent, app) {
        parent.call(this, app);

        var config = Collagen.config.session || {};

        // Allow externally-configured session stores
        if (config.store && config.store.module) {
            var store = require(config.store.module)(middleware);
            config.store = new store(config.store);
        }

        config = _.defaults(config, {
            key: 'connect.sid',
            secret: Date.now().toString(),
            store: new middleware.session.MemoryStore(_.defaults(config.store || {}, {reapInterval: -1})),
            cookie: _.defaults(config.cookie || {}, {path: '/', httpOnly: true, maxAge: 14400000})
        });

        // Initialize session store
        this.session = middleware.session(config);
        this.session.key = config.key;
        this.use(this.session);

        config = _.defaults(config, {
            stubKey: 'collagen.auth',
            stubCookie: _.omit(config.cookie, 'secure')
        });
        Collagen.config.session = this.config = config;

        this.use(this.sessionPassive.bind(this));

        // Rehydrate the user model
        this.use(this.user.bind(this));
        Collagen.config.adminParty && this.use(this.admin.bind(this));
        this.use(function(req, res, next) {
            // Store user in global scope during current request
            Collagen.user = req.session.user;
            next();
        });
    }
});

// Passively instantiate the session (either via cookie in req or because
// adminParty is active). Overriding this method to further scope active
// sessions to application-specific paths/requests is recommended.
server.prototype.sessionPassive = function(req, res, next) {
    if (req.cookies[this.config.key] || Collagen.config.adminParty) {
        res.cookie(this.config.stubKey, 'yes', this.config.stubCookie);
        this.session(req, res, next);
    } else {
        // Delete the stub cookie if one exists.
        if (req.cookies[this.config.stubKey]) {
            res.cookie(this.config.stubKey, '', _.defaults({ maxAge: - 864e9 }, this.config.stubCookie));
        }
        next();
    }
}

// Instantiate user model from stored user JSON.
// See https://github.com/senchalabs/connect/blob/master/lib/middleware/session/memory.js#L70-76
// for how user models are converted to JSON when sessions are saved.
server.prototype.user = function(req, res, next) {
    if (req.session && req.session.user && req.session.user.id) {
        req.session.user = new models.User(req.session.user, req.query);
        req.session.user.authenticated = true;
        req.session.user.fetch({
            success: function() { next(); },
            error: function() { next(); }
        });
    } else {
        req.session.user = new models.User();
        next();
    }
}

// Always log in when we're having an admin party.
server.prototype.admin = function(req, res, next) {
    if (req.session && !req.session.user) {
        var attr = _.isBoolean(Collagen.config.adminParty) ? models.User.prototype.adminDefaults : Collagen.config.adminParty;
        req.session.user = new models.User(attr, req.query);
        req.session.user.authenticated = true;
        next();
    } else {
        next();
    }
}
