model = Backbone.Model.extend({
    url: function() {
        return '/api/' + this.constructor.title + (this.id ? '/' + this.id : '');
    },
    urlRoot: function() {
        return '/api/' + this.constructor.title;
    },
    // Determine user access to a model
    // --------------------------------
    access: function(type, user) {
        var model = this;
        if (!user) user = Collagen.user;
        if (!_.contains(['read', 'create', 'update', 'delete'], type)) return false;
        if (model.permissions[type] === 'all') return true;
        if (model.permissions[type] === 'owner' && user.isOwner(model)) return true;
        if (user.hasRole(model.permissions[type])) return true;
        if (user.hasRole('admin')) return true;
        return false;
    },
    // Define model permissions
    // ------------------------
    permissions: {
        'read': 'all',
        'create': ['authenticated user'],
        'update': 'owner',
        'delete': 'owner'
    }
});
