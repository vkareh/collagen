router = Backbone.Router.extend({});

router.prototype.routes = {
    '': 'home'
}

// Homepage
// --------
router.prototype.home = function() {
    this.send(views.Page, {template: 'Home'});
}

// Default router element
// ----------------------
router.prototype.page = function(page) {
    if (Bones.plugin.templates[page]) {
        this.send(views.Page, {template: page});
    } else {
        this.send(views.Page, {template: 'Home'});
    }
}

// Helper to assemble the page title
// ---------------------------------
router.prototype.pageTitle = function(view, title) {
    title = (Bones.server ? Collagen.config.name : title) || 'Collagen.js';
    return (view.pageTitle ? view.pageTitle + ' | ' + title : title);
}

// Client-side router send
// -----------------------
router.prototype.send = function(view, options) {
    var options = arguments.length > 1 ? arguments[1] : {};

    var v = new view(options);
    v.init();

    // Populate the #page div with the main view.
    $('#page').empty().append(v.el);

    // Render and attach client-side behaviors
    v.render().attach().activeLinks().scrollTop();

    // Set the page title.
    document.title = this.pageTitle(v, _.last(document.title.split(' | ')));
}

// Generic error handling
// ----------------------
router.prototype.error = function(error) {
    if (typeof error == 'string') error = {};
    this.send(views.Error, _.isArray(error) ? error.shift() : error);
}
