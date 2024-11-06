// Attributes
/*
 * TierID - int
 * TierDesc - string
 * Lunch - "Included" or "Not Included"
 * Level - "Beginner", "Intermediate", "Advanced"
 * AgeRange - "5 - 10"
 * ClassSize - int
 * Cost - decimal
 * Duration - "2 hours / day (2 days course)"
 */

const SelectedTierSingleton = (function () {
  // Private variable to hold the instance
  let instance;

  // Private method to initialize the instance with an empty tier data object
  function init() {
    // Private data
    const tierData = {};

    return {
      // Public method to get an attribute
      getAttribute: function (key) {
        return tierData[key];
      },
      // Public method to set an attribute
      setAttribute: function (key, value) {
        tierData[key] = value;
      },
      // Public method to get all attributes
      getAllAttributes: function () {
        return { ...tierData }; // Return a copy of the data
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
