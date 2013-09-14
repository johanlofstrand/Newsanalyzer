var fs = require('fs'),
    xml2js = require('xml2js'),
    util = require('util');

var parser = new xml2js.Parser();
parser.addListener('end', function(result) {
  //  console.dir(result);
    console.log(util.inspect(result, false, null))
    console.log('Done.');
});
fs.readFile(__dirname + '/svtrss/svtrss.xml', function(err, data) {
    parser.parseString(data);
});