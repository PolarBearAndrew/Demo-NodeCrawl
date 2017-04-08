
const _HOSTNAME = 'https://www.ptt.cc';
const _URL = _HOSTNAME + '/bbs/Gossiping/index1.html';

var request = require("request");
var cheerio = require("cheerio");

var records = [];

let cookie = request.cookie('over18=1');
let j = request.jar();
let options = {
    jar: j,
    url: _URL, 
    method: "GET",
};
j.setCookie(cookie, _URL);

console.log('##############\nurl: %s\n', _URL);

request(options, (err, r, html) => {
    if(err) throw err;
    $ = cheerio.load(html);
    $('.r-ent').each( function(i, ele) {
        records[i] = {
            link: _HOSTNAME + $(ele).attr('href'),
            title: $(ele).children('.title').children('a').text(),
            date: $(ele).children('.meta').children('.date').text(),
            author: $(ele).children('.meta').children('.author').text(),
        };
    });
    console.log('records', records);
});

