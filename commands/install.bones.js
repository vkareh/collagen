command = Bones.Command.extend();

command.description = 'Create a starter Collagen.js application.';

command.options.name = {
    'title': 'name=[name]',
    'shortcut': 'n',
    'description': 'Create application with specific name.',
    'default': 'My Collagen.js App'
};

command.options.machineName = {
    'title': 'machineName=[name]',
    'shortcut': 'm',
    'description': 'Set application machine name.',
    'default': function(plugin) {
        if (plugin.config.name) {
            return plugin.config.name.toLowerCase().replace(/^\W+/, '').replace(/\W+$/, '').replace(/\W+/g, '-');
        }
        return 'collagen-app';
    }
};

var path = require('path')
,   fs = require('fs');

command.prototype.initialize = function(plugin, callback) {

    // Initialize directories
    var directories = [
        'app',
        'app/assets',
        'app/assets/css',
        'app/assets/img',
        'app/assets/js',
        'app/commands',
        'app/models',
        'app/routers',
        'app/servers',
        'app/templates',
        'app/views'
    ];
    _.each(directories, function(dir) {
        dir = path.join(global.__CollagenPath__, dir);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, 0775);
        }
    });
    var errors = [];

    // Create collagen.json configuration file
    var collagenConfigPath = path.join(global.__AppPath__, 'collagen.json');
    fs.exists(collagenConfigPath, function(exists) {
        if (!exists) fs.writeFileSync(collagenConfigPath, JSON.stringify({
            name: plugin.config.name,
            email: plugin.config.adminEmail,
            navbar: 'static'
        }, null, '    '));
    });

    // Create starter index.js file
    var indexPath = path.join(global.__AppPath__, 'index.js');
    fs.exists(indexPath, function(exists) {
        var indexFile = "";
        indexFile += "var collagen = require('collagen');\n\n";
        indexFile += "// Add modules that need to load before your app here...\n";
        indexFile += "require('../modules/collagen-log');\n\n";
        indexFile += "collagen.load(__dirname);\n\n";
        indexFile += "// Add modules that will override your app here...\n\n";
        indexFile += "collagen.start();";
        !exists && fs.writeFileSync(indexPath, indexFile);
    });

    // Create package.json file
    var packagePath = path.join(global.__AppPath__, 'package.json');
    fs.exists(packagePath, function(exists) {
        if (!exists) fs.writeFileSync(packagePath, JSON.stringify({
            name: plugin.config.machineName,
            main: './index.js'
        }, null, '    '));
    });

    // Add starter CSS files
    var cssDir = path.join(global.__AppPath__, 'assets/css');
    fs.exists(path.join(cssDir, 'style.css'), function(exists) {
        var cssFile = '/* Add your CSS here... */';
        if (!exists) fs.writeFileSync(path.join(cssDir, 'style.css'), cssFile);
    });
    fs.exists(path.join(cssDir, 'print.css'), function(exists) {
        var cssFile = '/* Add your print CSS here... */';
        if (!exists) fs.writeFileSync(path.join(cssDir, 'print.css'), cssFile);
    });

    // Copy template files
    var templateSourceDir = path.join(global.__CollagenPath__, 'templates')
    ,   templateDestDir = path.join(global.__AppPath__, 'templates');
    fs.exists(path.join(templateDestDir, 'Home._'), function(exists) {
        if (!exists) fs.createReadStream(path.join(templateSourceDir, 'Home._')).pipe(fs.createWriteStream(path.join(templateDestDir, 'Home._')));
    });
    fs.exists(path.join(templateDestDir, 'Footer._'), function(exists) {
        if (!exists) fs.createReadStream(path.join(templateSourceDir, 'Footer._')).pipe(fs.createWriteStream(path.join(templateDestDir, 'Footer._')));
    });

    console.log('New app created successfully.');
    console.log('Please see the README.md file for usage details.');
    
    callback && callback();
};
