// Attributes
/*
 *   Name: string
 *   dateOfBirth: yyyy-mm-dd,
 *   Gender: "Male", "Female"
 *   School: string
 *   Skillsets: "Skill1, skill2"
 *   Needs: string
 */

const ChildrenDataSingleton = (function () {
  let instance;

  function init() {
    const childrenData = [];

    return {
      addChild: function (child) {
        // Check if the child already exists based on the name (or other unique identifier)
        const existingIndex = childrenData.findIndex(
          (c) => c.name === child.name
        );
        if (existingIndex > -1) {
          // If the child exists, update their data
          childrenData[existingIndex] = child;
        } else {
          // If the child does not exist, add them to the array
          childrenData.push(child);
        }
      },
      getChild: function (index) {
        return childrenData[index];
      },
      getAllChildren: function () {
        return [...childrenData]; // Return a copy of the data
      },
      removeChild: function (index) {
        if (index >= 0 && index < childrenData.length) {
          childrenData.splice(index, 1);
        }
      },
      updateChild: function (index, updatedChild) {
        if (index >= 0 && index < childrenData.length) {
          childrenData[index] = updatedChild;
        }
      },
    };
  }

  return {
    getInstance: function () {
      if (!instance) {
        instance = init();
      }
      return instance;
    },
  };
})();

export default ChildrenDataSingleton;
