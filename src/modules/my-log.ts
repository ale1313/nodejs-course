export const info = (text: string): string => {
  console.log(`INFO: ${text}`);
  return text;
};

export const error = (text: string): string => {
  console.log(`ERROR: ${text}`);
  return text;
};

/* Second way of exporting
module.exports.info = info;
module.exports.error = error;
*/

/* Third way of exporting
module.exports = { info, error };
*/
