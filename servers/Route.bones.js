var path = require('path')
,   fs = require('fs')
,   middleware = require('express')
,   env = process.env.NODE_ENV || 'development';

var vendor = servers.Route.prototype.assets.vendor;

// Include Bootstrap JavaScript
vendor.push(require.resolve('../assets/js/bootstrap.min.js'));

// Include application JavaScript files
var jsPath = path.join(global.__AppPath__, 'assets/js');
fs.readdirSync(jsPath).reverse().forEach(function(file) {
    vendor.push(require.resolve(path.join(jsPath, file)));
});

// Load data from packag.json file
var config = require(path.join(global.__AppPath__, '/package.json'));
if (!config) return;

// Make core images available to application
server = servers.Asset.augment({
    initialize: function(parent, app) {
        parent.call(this, app);
        this.use('/assets/' + config.name + '/img', middleware['static'](
            path.join(__CollagenPath__, 'assets/img'),
            { maxAge: env === 'production' ? 3600 * 1000 : 0 } // 1 hour
        ));
    }
});
