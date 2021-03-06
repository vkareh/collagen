view = views.Collagen.extend({id: 'static-page'});

view.prototype.render = function() {
    // Display page title
    this.pageTitle = this.options.pageTitle || _.map(this.options.template.replace(/-/g, '_').split('_'), function(w) {
        return w.charAt(0).toUpperCase() + w.substr(1);
    }).join(' ');
    // Render requested template
    $(this.el).empty().append(templates[this.options.template](this.options));
    return this;
}
