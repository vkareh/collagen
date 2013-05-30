view = views.View.extend({id: 'main'});

view.prototype.init = _.once(function() {
    // Instantiate global client-side routing view
    this.collagen = new views.App({model: this});
    // Force fresh cache on each application restart
    $.ajaxSetup({data: {_: Collagen.version}});
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
    $('#collagen-nav-bar ul.nav li').removeClass('active');
    $('#collagen-nav-bar ul.nav li a').each(function(i, a) {
        activePath == $(a).attr('href') && $(a).parent('li').addClass('active');
    });
    return this;
}
