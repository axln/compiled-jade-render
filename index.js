var fs = require('fs');
var jadeRuntime = require('jade-runtime');

module.exports = function (filePath, locals, callback) {
  fs.readFile(filePath, function (err, content) {
    if (err) {
      return callback(new Error(err));
    }
    var getTemplateFunction = new Function('jade', 'return ' + content.toString() + ';');
    var templateFunction = getTemplateFunction(jadeRuntime);
    var rendered = templateFunction(locals);
    return callback(null, rendered);
  })
};