var path = require('path')
,   fs = require('fs');

Bones.Command.options['collagen'] = {
    'title': 'collagen=[path]',
    'description': 'Path to Collagen configuration file.',
    'default': function(options, config) {
        return path.join(global.__AppPath__, 'collagen.json');
    }
}

Bones.Command.augment({
    bootstrap: function(parent, plugin, callback) {
        parent.call(this, plugin, function() {
            try {
                var config = JSON.parse(fs.readFileSync(plugin.config.collagen));
                // Allow override of Collagen configuration by passing in-line parameters
                Collagen.config = _.defaults(_.omit(plugin.config, 'collagen'), config);
            } catch (e) {
                console.error(e);
            }
            callback && callback();
        });
    }
});
