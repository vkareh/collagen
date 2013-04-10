var fs = require('fs')
,   path = require('path')
,   Bones = require(global.__BonesPath__ || 'bones')
,   __BonesServerDir__ = path.join(path.dirname(global.__BonesPath__), 'server')
,   utils = Bones.utils;

// Load wrappers
var wrappers = {};
fs.readdirSync(__BonesServerDir__).forEach(function(name) {
    var match = name.match(/^(.+)\.(prefix|suffix)\.js$/);
    if (match) {
        wrappers[match[1]] = wrappers[match[1]] || {};
        wrappers[match[1]][match[2]] =
            fs.readFileSync(path.join(__BonesServerDir__, name), 'utf8')
                .split('\n').join('');
    }
});

// require() override to add Collagen as a globally available object
require.extensions['.bones.js'] = function(module, filename) {
    var content = fs.readFileSync(filename, 'utf8');
    var kind = utils.singularize(path.basename(path.dirname(filename)));

    wrappers[kind] = wrappers[kind] || {};
    wrappers[kind].prefix = wrappers[kind].prefix || '';
    wrappers[kind].suffix = wrappers[kind].suffix || '';

    content = wrappers[kind].prefix + ';var Collagen = require(\'' + path.join(__dirname, 'collagen') + '\');' + content + '\n;' + wrappers[kind].suffix;
    module._compile(content, filename);

    if (module.exports) {
        Bones.plugin.add(module.exports, filename);
    }
};
