module.exports.info = function info(text) {
  console.log(`INFO: ${text}`);
  return text;
};

module.exports.error = function error(text) {
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
