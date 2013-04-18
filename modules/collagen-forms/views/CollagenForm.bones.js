view = views.View.extend({
    tagName: 'form',
    initialize: function() {
        this.model = this.model || new models.CollagenForm();
        this.render();
        _.each(this.model.attributes, function(value, element) {
            $('#' + element).val(value);
            $('input[name="' + element + '"]').each(function() {
                if ($(this).val() == value || (_.isArray(value) && _.contains(value, $(this).val()))) {
                    $(this).attr('checked', 'checked');
                }
            });
        });
        this.updateFormState();
    },
    render: function() {
        var template = this.options.template || this.template;
        if (template && templates[template]) {
            $(this.el).empty().append(templates[template]());
        }
    },
    events: {
        'change input,select,textarea': 'updateFormState',
        'click [type="submit"]': 'submitForm',
        'click #clearForm': 'clearForm',
        'update': 'update',
        'submit': 'submit'
    },
    updateFormState: function(event) {
        var model = this.model
        ,   data = {}
        ,   elements = [];

        // Remove hard-coded "checked" attributes
        if (event && $(event.currentTarget).attr('type') === 'checkbox') {
            if (!$(event.currentTarget)[0].checked) {
                $(event.currentTarget).removeAttr('checked');
            }
        }

        // Only look at form elements
        $('input,select,textarea').each(function() {
            // Named fields are part of a group
            if ($(this).attr('name')) {
                var name = $(this).attr('name');
                elements.push(name);
                // Only set options that are selected
                if ($(this).attr('checked')) {
                    if ($(this).attr('type') === 'checkbox') {
                        if (!data[name]) {
                            data[name] = [];
                        }
                        data[name].push($(this).val());
                    } else {
                        data[name] = $(this).val();
                    }
                }
            } else {
                var id = $(this).attr('id');
                if (id === undefined) return;
                elements.push(id);
                if ($(this).attr('type') === 'checkbox') {
                    if ($(this).attr('checked')) {
                        data[id] = $(this).val() || true;
                    } else {
                        delete data[id];
                    }
                } else {
                    data[id] = $(this).val();
                }
            }
        });

        // Clean-up empty elements
        _.each(_.union(elements, _.keys(this.model.attributes)), function(element) {
            if (!data[element]) {
                delete data[element];
                model.unset(element);
            }
        });

        // Save form values to current model
        model.set(data);
        $(this.el).trigger('update', data);
    },
    submitForm: function(event) {
        event.preventDefault();
        // Trigger a `submit` event and pass the data to it
        $(this.el).trigger('submit', this.model.attributes);
    },
    clearForm: function(event) {
        _.each(_.keys(this.model.attributes), function(attr) {
            $('#' + attr).val('').removeAttr('checked');
        });
        this.updateFormState();
        $('[type="submit"]').removeAttr('disabled');
        $('#messages').empty();
    },
    update: function(event) {
        //throw new Error('No update method defined');
    },
    submit: function(event) {
        //throw new Error('No submit method defined');
    }
});
