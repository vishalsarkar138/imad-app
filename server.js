var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var pages ={
    'pageOne' : {
    heading:"This is page one",
    content:"This is the text of page one",
    bgclr:'b8ea96'
    },
    'pageTwo' : {
    heading:"This is page two",
    content:"This is the text of page two",
    bgclr: '81abef'
    },
    'pageThree' : {
    heading:"This is page three",
    content:"This is the text of page three",
    bgclr:'d1bde7'
    }
};

function createTemplate(data){
            var heading= data.heading;
            var content= data.content;
            var bgclr= data.bgclr;
            var htmlTemplate=`<html>
                    <head>
                        <meta name="viewport" content="width=device-width, initial-scale=1"/>
                         <link href="ui/style.css" rel="stylesheet"/>   
                        <style>
                            h1{
                                font-family: Helvetica;
                            }
                            
                            body{
                                background-color: #${bgclr};
                            }
                            
                            p{
                                font-size:1.3em;
                                font-family: sans-serif;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <a href="/">Home</a>
                            <hr/>
                        <h1>${heading}</h1>
                        <p> ${content} </p>
                    </div>
                    
                </body>
            </html>`;//backquote (`) is used for multiple lines
            return htmlTemplate;
}


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/:pageName', function (req, res) {
  res.send(createTemplate(pages[pageName]));
});

app.get('/pagetwo', function (req, res) {
  res.send(createTemplate(pageTwo));
});
app.get('/pagethree', function (req, res) {
  res.send(createTemplate(pageThree));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
