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
  let instance; // Holds the singleton instance

  function init() {
    const accountData = {}; // Private data

    return {
      // Get an attribute from accountData
      getAttribute: function (key) {
        return accountData[key];
      },
      // Set or update attributes by merging with existing ones
      setAttributes: function (newAttributes) {
        Object.assign(accountData, newAttributes);
      },
      // Get a copy of all attributes
      getAllAttributes: function () {
        return { ...accountData };
      },
    };
  }

  return {
    // Get or create the singleton instance
    getInstance: function () {
      if (!instance) {
        instance = init();
      }
      return instance;
    },
  };
})();

export default AccountSingleton;
