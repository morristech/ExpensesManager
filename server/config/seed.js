module.exports = {
  services: [
    {
      path: 'users',
      delete: false,
      randomize: false, // don't pick a random template
      templates: [
        {
          email: 'admin@admin.com',
          password: 'admin',
          roles: ['user', 'manager', 'admin']
        },
        {
          email: 'manager@manager.com',
          password: 'manager',
          roles: ['user', 'manager']
        },
      ]
    }
  ]
};
