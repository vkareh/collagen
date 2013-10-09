model = models.Model.extend({
    defaults: {
        roles: ['anonymous user'],
        language: 'en'
    },

    // Boolean. Marks whether a User model has been authenticated. Do not
    // trust this flag for critical client-side access protection as it can be
    // modified by other javascript code.
    authenticated: false,

    // Determine model ownership
    // -------------------------
    isOwner: function(model) {
        return this.get('id') === model.get('user');
    },

    // Check user roles
    // ----------------
    hasRole: function(roles) {
        var user = this;
        if (!_.isArray(roles)) roles = [roles];
        return _.any(roles, function(role) {
            return _.contains(user.get('roles'), role);
        });
    }
});
