// Memory-based back-end store.
// Provided as a default for development purposes.
// You will need to override it in your own models.
var sync = function(method, model, options) {
    Collagen.store = Collagen.store || {};

    // Verify model access
    if (!model.access(method)) return options.error(new Error('You do not have permission to ' + method + ' this ' + model.constructor.title));

    switch (method) {
        case 'read':
            // Read from store
            if (model.id) model.set(Collagen.store[model.id]);
            break;
        case 'create':
            // Assign a user to the model
            if (!model.get('user')) model.set({user: Collagen.user.get('id')});
            // Assign attribute hash as the ID
            if (!model.id) model.id = require('crypto').createHash('md5').update(JSON.stringify(model.attributes)).digest('hex');
        case 'update':
            // Store latest version
            Collagen.store[model.id] = model.attributes;
            break;
        case 'delete':
            // Remove form store
            if (model.id) {
                delete Collagen.store[model.id];
                model.clear();
            }
            break;
        default:
            return options.error(new Error('An error ocurred with your request.'));
    }

    options.success(model);
}

// Assign default `sync` method when necessary
var register = models.Model.register;
models.Model.register = function(server) {
    if (this.prototype.sync === undefined) {
        this.prototype.sync = function(method, model, options) {
            if (process.env.NODE_ENV === 'production') {
                var warning = 'The ' + Bones.utils.colorize(this.constructor.title, 'default', 'bold') + ' model has no `sync()` method defined. The default Collagen in-memory store will be used instead.';
                console.warn(Bones.utils.colorize('Warning:'), warning);
            }
            return sync(method, model, options);
        }
    }
    return register.apply(this, arguments);
}
