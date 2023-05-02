const MAX_LOOPS = process.env.OBJECT_SIZE_MAX_LOOPS || 10000;
/**
 * rough bytes calculation of a javascript object (circular dependency safe).
 *
 * @param targetObject {Object|string|number|boolean}
 * @private
 * @returns {number}
 */
module.exports.roughObjectSize = (targetObject) => {
  const objectList = []; // accumulates all objects in order to detect and skip circular dependency
  const stack = [targetObject]; // contains the ongoing objects to calculate
  let bytes = 0;
  let loops = 0;

  while (stack.length && loops <= MAX_LOOPS) {
    const value = stack.pop();

    loops += 1;

    if (typeof value === 'boolean') {
      bytes += 4;
    } else if (typeof value === 'string') {
      bytes += value.length * 2;
    } else if (typeof value === 'number') {
      bytes += 8;
    } else if (typeof value === 'object' && objectList.indexOf(value) === -1 && value !== null) {
      objectList.push(value);

      Object.keys(value).forEach(key => {
        if (value !== null) {
          stack.push(value[key]);
        }
      });
    }
  }

  if (loops > MAX_LOOPS) return Infinity;

  return bytes;
};
