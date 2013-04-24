routers.CollagenAdmin.prototype.routes = {
    'admin': 'admin',
    'admin/:task': 'admin'
}

routers.CollagenAdmin.prototype.admin = function(task) {
    if (!Collagen.user.hasRole('admin')) {
        Collagen.messages.add({type: 'error', message: 'You are not an administrator'});
        return this.accessDenied();
    }
    if (task && _.isFunction(this['collagenAdmin_' + task])) {
        return this['collagenAdmin_' + task]();
    }
    this.send(views.CollagenAdmin);
}
