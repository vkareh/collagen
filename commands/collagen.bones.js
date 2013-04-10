var path = require('path')
,   fs = require('fs');

Bones.Command.options['collagen'] = {
    'title': 'collagen=[path]',
    'description': 'Path to Collagen configuration file.',
    'default': function(options, config) {
        var files = config ? config.files : Bones.Command.options['files'].default();
        return path.join(files, 'app', 'collagen.json');
    }
};

Bones.Command.augment({
    bootstrap: function(parent, plugin, callback) {
        parent.call(this, plugin, function() {
            try {
                Collagen.config = plugin.config.collagen = JSON.parse(fs.readFileSync(plugin.config.collagen));
            } catch (e) {
                console.error(e);
            }

            callback();
        });
    }
});
