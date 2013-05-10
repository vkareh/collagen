// @todo New users should automatically get a random hash as `id` for session/memory store purposes
model = models.User.extend({
    defaults: {
        id: null,
        roles: ['anonymous user'],
        language: 'en'
    },
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
