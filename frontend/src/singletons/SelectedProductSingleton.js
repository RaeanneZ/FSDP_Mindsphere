// Attributes
/*
 * Name - string
 * ProgDesc - string
 * ProgID - int
 * ProgIntro - string
 * ProgType - "Light", "Regular", "Premium"
 */

const SelectedProductSingleton = (function () {
  // Private variable to hold the instance
  let instance;

  // Private method to initialize the instance with an empty product data object
  function init() {
    // Private data
    const productData = {};

    return {
      // Public method to get an attribute
      getAttribute: function (key) {
        return productData[key];
      },
      // Public method to set an attribute
      setAttribute: function (key, value) {
        productData[key] = value;
      },
      // Public method to get all attributes
      getAllAttributes: function () {
        return { ...productData }; // Return a copy of the data
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

// Usage
const selectedProductA = SelectedProductSingleton.getInstance();

// Getting an attribute that hasn't been set yet
console.log(selectedProductA.getAttribute("Name")); // Output: undefined

// Setting attributes
selectedProductA.setAttribute("Name", "Product A");
selectedProductA.setAttribute("ProgDesc", "Description of Product A");
selectedProductA.setAttribute("ProgID", "12345");
selectedProductA.setAttribute("ProgIntro", "Intro to Product A");
selectedProductA.setAttribute("ProgType", "Type A");

// Getting an attribute
console.log(selectedProductA.getAttribute("Name")); // Output: Product A

// Getting all attributes
console.log(selectedProductA.getAllAttributes());
// Output:
// {
//   Name: "Product A",
//   ProgDesc: "Description of Product A",
//   ProgID: "12345",
//   ProgIntro: "Intro to Product A",
//   ProgType: "Type A"
// }

const selectedProductB = SelectedProductSingleton.getInstance();
console.log(selectedProductB.getAttribute("ProgID")); // Output: 12345
