view = views.Collagen.extend({
    id: 'admin',
    render: function() {
        $(this.el).empty().append(templates.CollagenAdmin(this.options));
        return this;
    },
    addAdminTask: function(task) {
        $('ul#tasks').append(templates.CollagenAdminTask(task));
        return this;
    }
});

// Display link in top navigation bar
// ----------------------------------
views.CollagenNavBar.augment({
    initialize: function(parent) {
        parent.call(this);
        if (Collagen.user.hasRole('admin')) {
            this.addMenuItem({path: '/admin', label: 'Admin', weight: 10});
        }
    }
});
