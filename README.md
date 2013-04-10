Collagen.js
===========

[Collagen](http://github.com/vkareh/collagen) is a flexible node.js web
framework that uses [Bones](http://github.com/developmentseed/bones) to allow
client-server synchronization of [Backbone](http://backbonejs.org) components.

Collagen provides a set of core components and modules that allow for extensible
operations that many websites and web applications need by default.

----

### Usage

Run `npm install` and a post-install script will create (if it doesn't exist) an
`app/` directory with all necessary component folders and starter configuration
files.

Inside this `app/` directory is where your application's components will live.
Collagen is designed so that there is no need for modifying anything outside of
this folder.

All Collagen components follow the Bones naming format: `MyComponent.bones.js`
for client-side components and `MyComponent.server.bones.js` for server-only
components. Follow the
[Bones wiki](http://github.com/developmentseed/bones/wiki) for more information.

To start the application, just run `node index.js` from Collagen's root folder.

----

### Core Components

Collagen ships with a few default Backbone components from which all other
components should be extended whenever possible. This will allow your
application-specific components to inherit any improvements in future versions
of Collagen, as well as give you a set of basic operations.

#### Models & Collections

The top-level model and collection are `models/Model.bones.js` and
`models/Models.bones.js`, respectively. To extend them, create your model as

```
model = models.Model.extend({ /* ... */ });
```

or

```
model = models.Models.extend({ /* ... */ });
```

These models provide standard synchronization URL for any extending models and a
basic in-memory non-persistent store that should be overrided for your specific
use-case.

#### Views

Collagen has several default views:

* `App.bones.js` gives Collagen client-side routing capabilities.
* `Collagen.bones.js` is the basic top-level view from which you will extend your own. It provides initialization of the `App` view and active menu tracking.
* `Error.bones.js` is a basic error display page.
* `Page.bones.js` is a default page renderer that can be used for displaying basic templates that do not need their own complex view.
* `View.bones.js` is an extensible view that is _not_ linked to the top-level view. This is intended mainly for sub-views, which tend to be much simpler in terms of application interaction.

#### Routers

The `Collagen` router provides basic client- and server-side routing methods.
This means that you can create your express-style Backbone routers without
having to worry about how they will make it to the client. Collagen will take
care of initializing any necessary views, rendering them, attaching any
client-side behavior, and sending them to the client. It will also include
necessary global variables and userspace-safe instances of your application's
components.

#### Servers

Servers are specific to Bones, but follow a similar Backbone paradigm. They are
express middleware components that get executed throughout each request, and
give Bones (and hence Collagen) a way of modifying server-level behavior and
determine what gets passed on to the client.

The preferred way is to `augment` the `Collagen` server instance, rather than
extending it. This will give you access to the `add()` method, which acts
similarly to the express `use()` function, but bypasses requests for static
assets, decreasing the unnecessary load on your server.

#### Templates

Collagen has several default templates that can be easily overridden for your
own web application. Two of them (`Home._` and `Footer._`) are automatically
added to your app's template directory. You can easily override any other by
creating a new template with the same name.

Depending on your application, you may or may not need to override the main
`Collagen._` template. This template contains the top-level HTML that defines
your website. However, it is flexible and dynamic enough that it should serve
its purpose as is for most scenarios.

Collagen uses [Underscore](http://underscorejs.org) as its templating engine and
[Twitter Bootstrap](http://twitter.github.io/bootstrap) as the UI framework.

#### Assets

This directory contains static assets like CSS and javascript files. To add your
own, use the included `assets/` folder inside your `app/` directory. Any CSS and
javascript file added there will automatically be included in the main template
in alphabetical order. We include empty `style.css` and a `print.css` files for
convenience.

To override the default Bootstrap style, you can download one directly from a
place like [Bootswatch](http://bootswatch.com) and place it in the
`./app/assets/css` directory. The `Collagen._` template will make sure it gets
automatically included.

#### Commands

Commands are another Bones-specific component. It allows you to define custom
command-line interface (CLI) commands to be run on the server. It also allows
you to define flags that you pass to the application during start. For example:

```
node index.js --foo=bar
```

Throughout your code, you will be able to read `Bones.plugin.config.foo` (which
will return `"bar"` in this example).

Collagen also includes a basic command that loads configurations from your
`/app/collagen.json` file whenever the application starts. You should take a
look at this file and make any appropriate modifications to it. You can access
its values by reading the `Collagen.config` variable. The information in this
file is available _only_ on the server-side.

More information about commands can be found in the
[Bones Wiki](https://github.com/developmentseed/bones/wiki/Commands).

----

### Core Modules

This is a brief description on each of the core modules included with Collagen.
Please refer to the [Collagen Wiki](https://github.com/vkareh/collagen/wiki) for
examples and more information on how to use them.

#### CollagenAdmin

Provides an interface for tasks that only admin-level users can access. The
admin panel is extensible to inlcude admin options that are specific to your own
web application.

#### CollagenAuth

Provides a basic user authentication framework with its related components. You
can implement any number of compatible login mechanisms and back-end session
stores. It also contains basic access control for Backbone models.

#### CollagenForms

Provides an extensible Backbone view that makes using forms a breeze by
traversing the structure of your HTML form and knowing when to trigger `update`
and `submit` events. It is accompanied by a Backbone model that allows you to
keep track of the current state of your form and synchronize the data
back-and-forth between the client and server. It also provides integration with
[JSON Schema Validator](https://github.com/garycourt/JSV).

#### CollagenLog

Basic server-side access log for HTTP requests.

#### CollagenMenu

Provides extensible Backbone views and templates for dynamically generating and
extending navigation menus and the top navigation bar.

#### CollagenMessages

Provides a basic framework for displaying different types of messages to the
user.

