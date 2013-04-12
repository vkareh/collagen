#!/usr/bin/env node

var bones = require('bones');

require('./server/assets');
require('./server/plugin');

// Load core components
require('./routers/Collagen');
require('./servers/Collagen');
require('./views/App');
require('./views/Collagen');
require('./views/Page');
require('./views/Error');
require('./views/View');
require('./models/Model');
require('./models/Models');

// Load child plugins
require('./modules/collagen-menu');
require('./modules/collagen-auth');
require('./modules/collagen-admin');
require('./modules/collagen-messages');
require('./modules/collagen-forms');

bones.load(__dirname);
require(require('path').join(__dirname, 'app'));

if (!module.parent) {
    bones.start();
};
