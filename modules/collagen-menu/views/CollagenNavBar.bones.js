view = views.View.extend({id: 'navbar'});

view.prototype.menuItems = [{
    path: '/',
    label: 'Home',
    weight: -10
}];

view.prototype.render = function() {
    $(this.el).empty().append(templates['CollagenNavBar']({
        type: Collagen.config ? Collagen.config.navbar : 'static',
        title: Collagen.config ? Collagen.config.name : 'Collagen.js',
        menuItems: _.sortBy(this.menuItems, 'weight')
    }));
    return this;
}

view.prototype.addMenuItem = function(item) {
    item.weight = item.weight || 0;
    this.menuItems = _.union(this.menuItems, item);
}
