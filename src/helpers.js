/**
 * Simple helper function
 * @param {Object} obj
 * @return {Object}
 */
export const deepCopy = obj => {
  //simple deep copy recursive algorithm
  if (typeof obj !== "object") throw new Error("deep Copy requires object");
  let deepCopiedObject = { ...obj };

  for (let key in deepCopiedObject) {
    if (typeof key === "object") {
      deepCopiedObject[key] = deepCopy(deepCopiedObject[key]);
    }
  }
  return deepCopiedObject;
};
