var vendor = servers.Route.prototype.assets.vendor;

// Include Bootstrap JavaScript
vendor.push(require.resolve('../assets/js/bootstrap.min.js'));

var path = require('path')
,   fs = require('fs')
,   middleware = require('express')
,   env = process.env.NODE_ENV || 'development';

var packageFile = path.join(global.__AppPath__, '/package.json');

// Exit if no package.json file
if (!fs.existsSync(packageFile)) return;

// Get configured app name
var config = fs.readFileSync(packageFile, 'utf8');
if (config) config = JSON.parse(config);

// Make core images available to application
server = servers.Asset.augment({
    initialize: function(parent, app) {
        this.use('/assets/' + config.name + '/img', middleware['static'](
            path.join(__CollagenPath__, 'assets/img'),
            { maxAge: env === 'production' ? 3600 * 1000 : 0 } // 1 hour
        ));
        parent.call(this, app);
    }
});
