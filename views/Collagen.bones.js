view = views.View.extend({id: 'main'});

view.prototype.init = _.once(function() {
    this.collagen = new views.App({model: this});
    return this;
});

// Scrolls to top or fragment
// --------------------------
view.prototype.scrollTop = function() {
    var offset = $(window.location.hash).offset();
    var top = offset ? offset.top : 0;
    // Scroll top FF, IE, Chrome safe
    $('body').scrollTop(0) && $('body').scrollTop(top);
    $('html').scrollTop(0) && $('html').scrollTop(top);
    return this;
}

view.prototype.activeLinks = function() {
    var activePath = window.location.pathname;
    $('ul.nav li').removeClass('active');
    $('ul.nav li a').each(function(i, a) {
        activePath == $(a).attr('href') && $(a).parent('li').addClass('active');
    });
    return this;
}
