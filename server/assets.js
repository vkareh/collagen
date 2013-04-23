var fs = require('fs')
,   path = require('path')
,   Bones = require(global.__BonesPath__ || 'bones');

var packageFile = path.join(global.__AppPath__, '/package.json');

// Exit if no package.json file
if (!fs.existsSync(packageFile)) return;

// Get configured app name
var config = fs.readFileSync(packageFile, 'utf8');
if (config) config = JSON.parse(config);

// Load CSS files
Bones.plugin.css = [];
fs.readdirSync(path.join(global.__AppPath__, '/assets/css')).forEach(function(name) {
    Bones.plugin.css.push(path.join('/assets', config.name, 'css', name));
});

// Load javascript files
Bones.plugin.js = [];
fs.readdirSync(path.join(global.__AppPath__, '/assets/js')).forEach(function(name) {
    Bones.plugin.js.push(path.join('/assets', config.name, 'js', name));
});

// Load favicon
Bones.plugin.favicon = '/assets/collagen/img/favicon.ico';
if (fs.existsSync(path.join(global.__AppPath__, '/assets/img/favicon.ico'))) {
    Bones.plugin.favicon = path.join('/assets', config.name, 'img/favicon.ico');
}
