view = views.View.extend({id: 'breadcrumb'});

view.prototype.render = function() {
    $(this.el).empty().append(templates['CollagenBreadcrumb']({
        divider: this.options.divider || '/',
        menuItems: _.sortBy(this.menuItems, 'weight')
    }));
    return this;
}

view.prototype.addMenuItem = function(item) {
    item.weight = item.weight || 0;
    item.active = item.active || false;
    this.menuItems = _.union(this.menuItems || [], item);
}

view.prototype.events = {
    'click a': 'clickLink'
}

view.prototype.clickLink = function(event) {
    $(this.el).find('ul.breadcrumb li').each(function() { $(this).removeClass('active'); });
    $(event.currentTarget).parent().addClass('active');
}
