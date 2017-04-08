
const _HOSTNAME = 'https://www.ptt.cc';
const _URL = _HOSTNAME + '/bbs/Gossiping/index.html';

var request = require("request");
var cheerio = require("cheerio");
// var debug = require('debug')('app')

var records = [];

let cookie = request.cookie('over18=1');
let j = request.jar();
let options = {
    jar: j,
    url: _URL, 
    method: "GET",
};
j.setCookie(cookie, _URL);

console.log('url=', _URL);

request(options, (err, r, html) => {
    if(err) throw err;
    $ = cheerio.load(html);
    $('.r-ent').each( function(i, ele) {
        let r = {};
        r.title = $(ele).children('.title').children('a').text();
        r.author = $(ele).children('.meta').children('.author').text();
        r.date = $(ele).children('.meta').children('.date').text();
        r.link = _HOSTNAME + $(ele).attr('href');
        records[i] = r;
    });
    console.log('records', records);
});

