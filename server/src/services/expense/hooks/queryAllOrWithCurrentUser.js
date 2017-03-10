const auth = require('feathers-authentication').hooks;

/**
 * This hook is to be used on *before* and find method.
 * It does the following:
 * - check if admin
 *   - if yes, check if the ?all=true
 *     - if yes, return list of all expenses (no queryWithCurrentUser() hook)
 *     - if no, return list of current user's expenses (add queryWithCurrentUser() hook)
 *   - if no, return the queryWithCurrentUser() hook
 */
const queryAllOrWithCurrentUser = (options = {}) => {
  return function(hook) {
    // We can assume hook.params.user exists because the auth.restrictToAuthenticated()
    // hook is called before this and will throw an error if it doesn't
    if (hook.params.user.roles.indexOf('admin') >= 0) {
      if (hook.params.query.all === 'true') {
        // Remove the all=true query param because it interferes with the SQL request
        delete hook.params.query.all;
        // Call the next hook with our changed hook
        return hook;
      }
    }
    return auth.queryWithCurrentUser().call(this, hook);
  };
};

module.exports = queryAllOrWithCurrentUser;
