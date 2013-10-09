servers.Collagen.augment({
    initialize: function(parent, app) {
        parent.call(this, app)
        this.use(function(req, res, next) {
            Collagen.messages = new models.CollagenMessages();
            if (req.session.messages) {
                Collagen.messages.add(req.session.messages);
                delete req.session.messages;
            }
            next();
        });
    }
});
