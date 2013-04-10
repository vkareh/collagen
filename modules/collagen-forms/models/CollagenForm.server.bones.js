JSV = require('JSV').JSV;
var env;

models.Model.prototype.schema = {
    type: 'object',
    properties: {}
};

models.Model.prototype.env = function() {
    if (!env) {
        env = JSV.createEnvironment('json-schema-draft-03');
        env.setOption('defaultSchemaURI', 'http://json-schema.org/hyper-schema#');
        env.setOption('latestJSONSchemaSchemaURI', 'http://json-schema.org/schema#');
        env.setOption('latestJSONSchemaHyperSchemaURI', 'http://json-schema.org/hyper-schema#');
        env.setOption('latestJSONSchemaLinksURI', 'http://json-schema.org/links#');
    }
    return env;
}

// Use JSV validation by default
// Override this to provide your own custom validation logic
// ---------------------------------------------------------
models.Model.prototype.validate = function(attr) {
    var error = this.validateAttributes(attr);
    return error;
}

// Method to validate attributes against the model's JSON schema
// Validate properties separately to allow subsets of attributes
// -------------------------------------------------------------
models.Model.prototype.validateAttributes = function(attr) {
    var errors = this.env().validate(attr, this.getSchema()).errors;
    if (errors.length) {
        return this.formatErrors(errors);
    }   
}

// Get the JSV schema object for this model, registering it if not found
// ---------------------------------------------------------------------
models.Model.prototype.getSchema = function() {
    var schema;
    if (this.schema.id) {
        schema = (this.env().findSchema(this.schema.id)
        || this.env().createSchema(this.schema, undefined, this.schema.id)
    );
    }
    else {
        schema = this.env().createSchema(this.schema);
    }

    return schema;
}

// Format error output
// -------------------
models.Model.prototype.formatErrors = function(errors) {
    var error = errors.shift();
    var property = this.env().findSchema(error.schemaUri).getValue();

    if (property.description) {
        return property.description;
    } else {
        return (property.title || error.schemaUri.replace(/.*\//, '')) + ': ' + error.message;
    }
}
