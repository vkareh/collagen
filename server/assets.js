var fs = require('fs')
,   path = require('path')
,   Bones = require(global.__BonesPath__ || 'bones');

// Get configured app name
var config = fs.readFileSync('./app/package.json', 'utf8');
if (config) config = JSON.parse(config);

// Load CSS files
Bones.plugin.css = [];
fs.readdirSync('./app/assets/css').forEach(function(name) {
    Bones.plugin.css.push(path.join('/assets', config.name, 'css', name));
});

// Load javascript files
Bones.plugin.js = [];
fs.readdirSync('./app/assets/js').forEach(function(name) {
    Bones.plugin.js.push(path.join('/assets', config.name, 'js', name));
});

// Load favicon
Bones.plugin.favicon = '/assets/collagen/img/favicon.ico';
if (fs.existsSync('./app/assets/img/favicon.ico')) {
    Bones.plugin.favicon = path.join('/assets', config.name, 'img/favicon.ico');
}
