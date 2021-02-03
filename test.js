const querystring = require('querystring');
const url = "http://example.com/index.html?code=string&key=12&id=false";
const qs = "code=string&key=12&id=false";

const query_params = querystring.parse(url.split("?")[1])
console.log(query_params)