model = Backbone.Collection.extend({
    model: models.Model,
    url: function() {
        return '/api/' + Bones.utils.singularize(this.constructor.title);
    }
});
