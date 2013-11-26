var fs = require('fs')
,   path = require('path')
,   Bones = require(global.__BonesPath__ || 'bones');

// Load data from packag.json file
var config = require(path.join(global.__AppPath__, '/package.json'));
if (!config) return;

// Read files alphabetically
function alphabetical(a, b) {
    return a.toLowerCase().localeCompare(b.toLowerCase());
}

// Load CSS files
Bones.plugin.css = [];
if (fs.existsSync(path.join(global.__AppPath__, '/assets/css'))) {
    fs.readdirSync(path.join(global.__AppPath__, '/assets/css')).sort(alphabetical).forEach(function(name) {
        Bones.plugin.css.push(path.join('/assets', config.name, 'css', name));
    });
}

// Load favicon
Bones.plugin.favicon = '/assets/collagen/img/favicon.ico';
if (fs.existsSync(path.join(global.__AppPath__, '/assets/img/favicon.ico'))) {
    Bones.plugin.favicon = path.join('/assets', config.name, 'img/favicon.ico');
}
