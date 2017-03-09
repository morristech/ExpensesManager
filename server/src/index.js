'use strict';

const app = require('./app');
const port = app.get('port');
// app.seed()
  // .then(() => {
    const server = app.listen(port);

    server.on('listening', () =>
      console.log(`Feathers application started on ${app.get('host')}:${port}`)
    );
  // })
  // .catch(error => console.error('Error while seeding database.', error));
