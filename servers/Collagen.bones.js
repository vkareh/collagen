server = Bones.Server.extend({
    initialize: function(app) {
        this.use(function(req, res, next) {
            // Initialize Collagen as an empty object on every request
            Collagen = {};
            next();
        });
    }
});
