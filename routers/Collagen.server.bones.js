// Setup a closure variable whice records the time that the server was started.
// This is used to make sure static resources (css, js) have a different url
// when the code underneath them changes.
var time = Date.now();

/**
 * On the server the send method is overridden to provide the path to actually
 * send rendered pages to the browser. In addition to a rendered page, we also
 * append a JSON versions of any models/collections to the page that were used.
 * to construct it. While duplicative this allow us to easily re-attach those
 * same views back onto the DOM client side.
 */
routers.Collagen.prototype.send = function(view, options) {
    var options = arguments.length > 1 ? arguments[1] : {};

    // Execute the main view.
    var main = new view(options);
    main.render();

    // Add components to be sent to client
    var collagen = _.clone(Collagen),
        components = 'Collagen = {};';

    collagen.version = time;
    delete collagen.config;
    _.each(collagen, function(c, name) {
        // Add components to be re-hydrated on client
        if (c.constructor.title != undefined) components += 'Collagen.' + name + ' = new models.' + c.constructor.title + '(' + JSON.stringify(collagen[name]) + ');';
        else components += 'Collagen.' + name + ' = ' + (_.isObject(c) ? c : '"' + c + '"') + ';';

        // Initialize views specified on each component
        if (c.view && _.isString(c.view)) {
            components += 'new views.' + c.view + '({' + name + ':' + JSON.stringify(collagen[name]) + '});';
        }
    });

    // Provide all models with the data that will be used to prop them back up
    // on the browser.
    var o = '{el: $("#main"),';
    _.each(options, function(v, k) {
        // Any options that is a model or collection will have it's title
        // declared. Use this to re-hydrate it.
        if (v.constructor.title != undefined) {
            o += JSON.stringify(k) + ': new models.'+ v.constructor.title +'('+ JSON.stringify(options[k]) + '),';
        } else {
            o += JSON.stringify(k) + ':' + JSON.stringify(options[k]) +',';
        }
    });
    o = o.replace(/,$/, '}');

    // Finally send the page to the client.
    this.res.send(Bones.plugin.templates.Collagen({
        version: time,
        favicon: Bones.plugin.favicon,
        css: Bones.plugin.css,
        title: this.pageTitle(main),
        navbar: Collagen.config.navbar !== false ? (new views.CollagenNavBar(_.isString(Collagen.config.navbar) ? {type: Collagen.config.navbar} : Collagen.config.navbar)).render().html() : '',
        templates: Bones.plugin.templates,
        main: $(main.el).html(),
        startup: 'Bones.initialize(function(models, views, routers, templates) {' +
                     components + ';' +
                     'new views.' + main.constructor.title +'('+ o +').init().attach().activeLinks().scrollTop()' +
                 '});'
    }));
};
