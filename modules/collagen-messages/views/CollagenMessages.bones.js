view = views.View.extend({
    initialize: function() {
        // Allow for global display of messages
        Collagen.message = this.message;
        Collagen.error = this.error;
        return this.render();
    },
    render: function() {
        var messages = ''
        ,   cb = function(message) {
            message = new models.CollagenMessage(message);
            messages += templates.CollagenMessage(message.attributes);
        }
        if (_.isArray(Collagen.messages)) {
            _.each(Collagen.messages, cb);
        } else {
            Collagen.messages.forEach(cb);
        }
        $('#messages').empty().append(messages);
        return this;
    },
    // Display single message
    message: function(type, message, selector) {
        selector = selector || '#messages';
        if (typeof message === 'undefined') {
            message = type;
            type = 'standard';
        }
        message = templates.CollagenMessage({
            type: type,
            message: message
        });
        if ($(selector).length) $(selector).empty().append(message);
        else $('#main').prepend(message);
    },
    // Display error message from `sync` request
    error: function(model, resp) {
        var message = resp;
        if (resp instanceof Object) {
            if (resp.responseText) {
                try {
                    message = $.parseJSON(resp.responseText).message;
                } catch (err) {}
            } else if (resp.message) {
                message = resp.message;
            } else {
                message = resp.toString();
            }
        }
        message = templates.CollagenMessage({
            type: 'error',
            message: message
        });
        if ($('#messages').length) $('#messages').empty().append(message);
        else $('#main').prepend(message);
    }
});
