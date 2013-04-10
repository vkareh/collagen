// Memory-based back-end store.
// Provided as a default for development purposes.
// You will need to override it in your own collections.
var sync = function(method, collection, options) {
    Collagen.store = Collagen.store || {};
    var models = [];
    _.each(Collagen.store, function(model, id) {
        model.id = id;
        model = new collection.model(model);
        if (model.access('read')) models.push(model);
    });
    options.success(models);
}

var register = models.Models.register;
models.Models.register = function(server) {
    if (this.prototype.sync === undefined) {
        this.prototype.sync = function(method, collection, options) {
            if (process.env.NODE_ENV === 'production') {
                var warning = 'The ' + Bones.utils.colorize(this.constructor.title, 'default', 'bold') + ' collection has no `sync()` method defined. The default Collagen in-memory store will be used instead.';
                console.warn(Bones.utils.colorize('Warning:'), warning);
            }
            return sync(method, collection, options);
        }
    }
    return register.apply(this, arguments);
}
