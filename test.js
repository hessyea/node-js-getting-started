var http = require("http");
var url = require("url");
var querystring = require("querystring");
var server = http.createServer();
var port = process.env.PORT || 5000;

server.on("request", function (request, response) {
  var uri = url.parse(request.url);
  var qs = uri.query ? querystring.parse(uri.query) : {};

  var status = qs.status || 200;
  var contentType = qs.contentType || "text/plain";
  var body = qs.body || "hello there!";

  response.writeHead(status, {
    "Content-Type": contentType,
    "Content-Length": body.length
  });

  console.log(uri.pathname + " - HTTP " + status + " (" + contentType + "): " + body);

  response.end(body);
});

server.listen(port, function () {
  console.log("listening on port " + port);
});
