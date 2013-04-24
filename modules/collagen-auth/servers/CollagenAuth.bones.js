servers.Collagen.augment({
    initialize: function(parent, app) {
        parent.call(this, app);
        this.use(function(req, res, next) {
            Collagen.user = req.session && req.session.user ? req.session.user : new models.User();
            next();
        });
    }
});
