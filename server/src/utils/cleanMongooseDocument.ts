import mongoose from "mongoose";

function cleanMongooseDocument(doc: any): void {
  const keys = Object.keys(doc.toObject());

  keys.forEach((key) => {
    const value = doc[key];

    // Check for falsy values and empty arrays/objects, but preserve createdAt and updatedAt
    if (
      key !== "createdAt" &&
      key !== "updatedAt" && // Keep createdAt and updatedAt
      (!value || // Remove empty string
        (Array.isArray(value) && value.length === 0) || // Remove empty arrays
        (typeof value === "object" &&
          value !== null &&
          Object.keys(value).length === 0)) // Remove empty objects
    ) {
      // Use set to remove the field in Mongoose
      doc.set(key, undefined);
    } else if (Array.isArray(value)) {
      // If the value is an array, check each item
      value.forEach((item, index) => {
        if (typeof item === "object" && item !== null) {
          // Check if the item is a Mongoose document
          if (item instanceof mongoose.Document) {
            cleanMongooseDocument(item); // Clean nested Mongoose documents
          }
        }
        // Check for empty objects within the array
        if (
          typeof item === "object" &&
          item !== null &&
          Object.keys(item).length === 0
        ) {
          value.splice(index, 1); // Remove empty object from array
        }
      });
    } else if (typeof value === "object") {
      // Only clean nested objects if they're Mongoose documents
      if (value instanceof mongoose.Document) {
        cleanMongooseDocument(value);
      }
    }
  });
}

export default cleanMongooseDocument;
