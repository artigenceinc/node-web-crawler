var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

var app = express();

app.get('/crawl', function(req, res) {
    //All the crawl code comes here.
    url = "http://www.imdb.com/title/tt1229340/";

    request(url, function(error, response, html) {
        var json = {};
        if (!error) {
            var $ = cheerio.load(html);
            var title, release, rating;
            json = {
                title: "",
                release: "",
                rating: ""
            }

            $('.title_wrapper').filter(function() {
                var data = $(this);
                title = data.children().first().text().trim();
                release = data.children().first().children().text().trim();
                console.log(title, release);
                json.title = title;
                json.release = release;
            })

            $('.ratingValue').filter(function() {
                var data = $(this);
                rating = data.children().first().children().first().text().trim();

                json.rating = rating;
            })
        }

        fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err) {
            console.log('File Successfully Written Check your output.json file.');
        });

        res.send('Check your Console');
    })
})


app.listen(8080);

console.log('App is running on port 8080');

exports = module.exports = app;
