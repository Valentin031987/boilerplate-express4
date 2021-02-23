var express = require('express');
var app = express();
var bodyParser = require('body-parser')

let bp = bodyParser.urlencoded({extended: false})
app.use(bp);

app.get('/json', (req, res) => {
  const obj = {"message": "Hello json"};
  if( process.env.MESSAGE_STYLE === 'uppercase' ){
    obj.message = obj.message.toUpperCase();
  }
  res.json(obj);
});


app.get('/now', (req,res,next) => {
  req.time = new Date().toString()
  next()
}, (req, res) => {
  res.json({time: req.time})
})


app.get('/:word/echo', (req, res) => {
  res.json({echo: req.params.word})
})


app.route('/name')
  .get((req, res) => {
    const fullName = req.query.first + ' ' +req.query.last
    res.json({name: fullName})  
  })
  .post((req,res) => {
    const fullName = req.body.first + ' ' +req.body.last
    res.json({name: fullName})  
  })


 module.exports = app;
