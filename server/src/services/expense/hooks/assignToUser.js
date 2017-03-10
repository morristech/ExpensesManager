const auth = require('feathers-authentication').hooks;

/**
 * This hook is to be used on *before* the CREATE or UPDATE or PATCH method.
 * It does the following:
 * - check if admin
 *   - if yes, check userId is present
 *     - if yes, assign expense to userId
 *     - if no, assign expense to self
 *   - if no, assign expense to self
 */
const queryAllOrWithCurrentUser = (options = {}) => {
  return function(hook) {
    // We can assume hook.params.user exists because the auth.restrictToAuthenticated()
    // hook is called before this and will throw an error if it doesn't
    if (hook.params.user.roles.indexOf('admin') >= 0) {
      // If the hook already has a userId, we don't change it
      if (hook.data.userId) {
        return hook;
      }
    }
    // Else we change it with CurrentUser's id
    return auth.associateCurrentUser().call(this, hook);
  };
};

module.exports = queryAllOrWithCurrentUser;
