// Attributes
/*
 *   Name: string
 *   Email: string
 *   ContactNo: string
 *   Password: string
 *   dateOfBirth: yyyy-mm-dd,
 *   relationshipToChild: "Mother", "Father", "Guardian"
 *   address: string
 */

const AccountSingleton = (function () {
  // Private variable to hold the instance
  let instance;

  // Private method to initialize the instance with an empty account data object
  function init() {
    // Private data
    const accountData = {};

    return {
      // Public method to get an attribute
      getAttribute: function (key) {
        return accountData[key];
      },
      // Public method to set an attribute
      setAttribute: function (key, value) {
        accountData[key] = value;
      },
      // Public method to get all attributes
      getAllAttributes: function () {
        return { ...accountData }; // Return a copy of the data
      },
    };
  }

  return {
    // Public method to get the instance
    getInstance: function () {
      if (!instance) {
        instance = init();
      }
      return instance;
    },
  };
})();

export default AccountSingleton;
