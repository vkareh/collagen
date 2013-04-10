// @todo New users should automatically get a random hash as `id` for session/memory store purposes
model = models.User.extend({
    defaults: {
        id: null,
        roles: ['anonymous user'],
        language: 'en'
    }
});
