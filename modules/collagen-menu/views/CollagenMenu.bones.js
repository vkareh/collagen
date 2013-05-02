view = views.View.extend({id: 'menu'});

view.prototype.render = function() {
    $(this.el).empty().append(templates['CollagenMenu']({
        stacked: this.options.stacked || false,
        menuType: this.options.type || 'pills',
        menuItems: _.sortBy(this.menuItems, 'weight')
    }));
    return this;
}

view.prototype.addMenuItem = function(item) {
    item.weight = item.weight || 0;
    this.menuItems = _.union(this.menuItems || [], item);
}

view.prototype.events = {
    'click a': 'clickLink'
}

view.prototype.clickLink = function(event) {
    $(this.el).find('ul.nav li').each(function() { $(this).removeClass('active'); });
    $(event.currentTarget).parent().addClass('active');
}
