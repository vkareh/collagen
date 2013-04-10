model = Backbone.Model.extend({
    url: function() {
        return '/api/' + this.constructor.title + (this.id ? '/' + this.id : '');
    },
    urlRoot: function() {
        return '/api/' + this.constructor.title;
    }
});
