import feathers from 'feathers-client';
// import reduxifyServices, { getServicesStatus } from 'feathers-reduxify-services';
import reduxifyAuthentication from 'feathers-reduxify-authentication';

// import { mapServicePathsToNames, prioritizedListServices } from './feathersServices';

// Configure feathers-client
const app = feathers()
  .configure(feathers.hooks())
  .configure(feathers.authentication({
    storage: window.localStorage, // store the token in localStorage and initially sign in with that
  }));
export default app;

// Reduxify feathers-authentication
export const feathersAuthentication = reduxifyAuthentication(app,
  { isUserAuthorized: (user) => user.isVerified } // user must be verified to authenticate
);
