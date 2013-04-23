#!/usr/bin/env node

var path = require('path')
,   bones = require('bones');

exports.load = bones.load;
exports.start = bones.start;

// Set application directories
exports.path = global.__CollagenPath__ = __dirname;
global.__AppPath__ = module.parent ? path.dirname(module.parent.filename) : path.join(__dirname, 'app');

// Add application assets and Bones overrides
require(path.join(__dirname, 'server/assets'));
require(path.join(__dirname, 'server/plugin'));

// Load core components in order
require(path.join(__dirname, 'routers/Collagen'));
require(path.join(__dirname, 'servers/Collagen'));
require(path.join(__dirname, 'views/App'));
require(path.join(__dirname, 'views/View'));
require(path.join(__dirname, 'views/Collagen'));
require(path.join(__dirname, 'views/Page'));
require(path.join(__dirname, 'views/Error'));
require(path.join(__dirname, 'models/Model'));
require(path.join(__dirname, 'models/Models'));

// Load core components into plugin structure
bones.load(__dirname);

// Load core plugins
require(path.join(__dirname, 'modules/collagen-menu'));
require(path.join(__dirname, 'modules/collagen-auth'));
require(path.join(__dirname, 'modules/collagen-admin'));
require(path.join(__dirname, 'modules/collagen-messages'));
require(path.join(__dirname, 'modules/collagen-forms'));

// Load application module
if (!module.parent) require(global.__AppPath__);
