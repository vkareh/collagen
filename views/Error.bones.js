view = views.Collagen.extend({id: 'error'});

view.prototype.initialize = function(options) {
    _.bindAll(this, 'render');
    options = options || {};
    this.options = {};
    this.pageTitle = this.options.title = options.title || 'Not found';
    this.options.message = options.message || '';
    views.Collagen.prototype.initialize.call(this, options);
}

view.prototype.render = function() {
    $(this.el).empty().append(templates.Error(this.options));
    return this;
}
