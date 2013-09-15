var fs = require('fs'),
    xml2js = require('xml2js'),
    http = require('http'),
    util = require('util');

/*
** RSS XML parser, retrieve only the latest item in the list... 
*/
var parser = new xml2js.Parser();
parser.addListener('end', function(result) {
    //console.log(util.inspect(result, false, null));
    var firstItem = result.rss.channel[0].item[0]; 
    var title = firstItem.title;
    var pubDate = firstItem.pubDate;
    console.log("Latest RSS item had title: \'" + title + "\' and pubDate: " + pubDate);
});

/* 
** HTTP part for fetching latest rss - controlled by timer
*/
var timer = 1000*60; 

var options = {
  hostname: 'www.svt.se',
  port: 80,
  path: '/nyheter/sverige/rss.xml',
  method: 'GET'
};

var retrieveRSS = function () {
	var req = http.request(options, function(res) {
	  //console.log('STATUS: ' + res.statusCode);
	  //console.log('HEADERS: ' + JSON.stringify(res.headers));
	  res.setEncoding('utf8');
	  res.on('data', function (chunk) {
	    //console.log('BODY: ' + chunk);
	    parser.parseString(chunk);
	  });
	});

	req.on('error', function(e) {
	  console.log('problem with request: ' + e.message);
	});

	// write data to request body
	req.write('data\n');
	req.write('data\n');
	req.end();

	setTimeout(retrieveRSS,timer);
}
retrieveRSS();
