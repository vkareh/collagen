var express = require('express');

servers.Collagen.augment({
    initialize: function(parent, app, args) {
        if (!args) args = {};
        parent.call(this, app);

        // Initialize session store
        this.use(express.session({
            store: args.store || new express.session.MemoryStore({reapInterval: -1}),
            secret: Collagen.config.secret || require('crypto').createHash('md5').update(Date.now().toString()).digest('hex'),
            cookie: args.cookie || {path: '/', httpOnly: true, maxAge: 86400000}
        }));

        // Populate Collagen.user object
        this.use(function(req, res, next) {
            if (req.session && req.session.user) {
                if (req.session.user.attributes) Collagen.user = req.session.user;
                else Collagen.user = new models.User(req.session.user);
            } else Collagen.user = new models.User();
            next();
        });
    }
});
