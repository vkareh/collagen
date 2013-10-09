// Default admin data
models.User.prototype.adminDefaults = {
    id: 'admin',
    displayName: 'Administrator',
    roles: ['authenticated user', 'admin', 'administrator']
}

// This method needs to be overridden...
models.User.prototype.sync = function(method, model, options) {
    if (Collagen.config.adminParty) {
        model.set(model.adminDefaults);
    }
    options.success(model);
}
