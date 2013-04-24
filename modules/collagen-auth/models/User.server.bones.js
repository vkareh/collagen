var secret = Date.now().toString();
// Note: this secret may not depend on the model instance!
models.User.secret = function() {
    return Bones.plugin.config.secret || Collagen.config.secret || secret;
}

models.User.prototype.initialize = function() {
    // Set admin defaults
    if (Bones.plugin.config.adminParty) {
        this.set(this.adminDefaults);
    }
}

// Default admin data
models.User.prototype.adminDefaults = {
    displayName: 'Admin',
    roles: ['admin']
}

// This method needs to be overridden...
models.User.prototype.sync = function(method, model, options) {
    if (this.id === 'admin') {
        model.set(this.adminDefaults);
    }
    options.success(model);
}

// Determine model ownership
// -------------------------
models.User.prototype.isOwner = function(model) {
    return this.get('id') === model.get('user');
}

// Check user roles
// ----------------
models.User.prototype.hasRole = function(roles) {
    var user = this;
    if (!_.isArray(roles)) roles = [roles];
    return _.any(roles, function(role) {
        return _.contains(user.get('roles'), role);
    });
}
