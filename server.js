var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape', function(req, res, next){
  var getNews = setInterval(() => {
      var oldFile ="";
      url ="https://news.google.de/news";
      fs.readFile("output.txt", (err,data) => {
        //if(err) throw err;
        if(data){oldFile = data;}
      })


      //Error, reponse code, html
      var requestFunction = request(url, (err, res, html) => {



        if (!err){

            var $ = cheerio.load(html);


            var title;

            //Filter HTML for wished info

              $('.titletext').filter(function(){
                  var data = $(this);
                  title = data.text();
              });
              fs.writeFile('output.txt', oldFile+"\n"+title, function(err){

                  console.log('File successfully written at output.txt at '+Date());

              });


        }


      });}, 1000)//minimum interval = ping to url


  res.send("Success "+ Date())

})

var port = process.env.port || 8081;

app.listen(port)

console.log('Magic happens on port '+port);

exports = module.exports = app;
