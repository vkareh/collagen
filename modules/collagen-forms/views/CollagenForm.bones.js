view = views.View.extend({
    tagName: 'form',
    initialize: function() {
        this.model = this.model || new models.CollagenForm();
        _.bindAll(this, 'change');
        this.model.bind('change', this.change, this);
        this.render();
        _.each(this.model.attributes, function(value, element) {
            $('#' + element + ', textarea[name="' + element + '"], select[name="' + element + '"]').val(value);
            $('input[name="' + element + '"]').each(function() {
                if ($(this).val() == value || (_.isArray(value) && _.contains(value, $(this).val()))) {
                    $(this).attr('checked', 'checked');
                }
            });
        });
        this.updateFormState();
    },
    render: function() {
        var template = this.options.template || this.template || this.constructor.title;
        if (template && templates[template]) {
            $(this.el).empty().append(templates[template]());
        }
    },
    change: function(model, attributes) {
        var self = this;
        _.each(attributes.changes, function(changed, attr) {
            if (changed) $(self.el).trigger('change:' + attr, self.model.get(attr));
        });
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

        // Only look at form elements inside form
        $(this.el).find('input,select,textarea').each(function() {
            // Named fields are part of a group
            if ($(this).attr('name')) {
                var name = $(this).attr('name')
                ,   value = $(this).val();
                elements.push(name);

                switch ($(this).attr('type')) {
                    case 'checkbox': 
                        if (!data[name]) {
                            data[name] = [];
                        }
                        if ($(this).attr('checked')) {
                            data[name].push(value);
                        }
                        break;
                    case 'radio':
                        if ($(this).attr('checked')) {
                            data[name] = value;
                        }
                        break;
                    default:
                        data[name] = value;
                        break;
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
        _.each(elements, function(element) {
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

