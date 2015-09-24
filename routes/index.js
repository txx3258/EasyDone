var express = require('express');
var router = express.Router();
var fs = require('fs');
var ejs = require("ejs");

var account=fs.readFileSync('/Users/soft_tangxiaoxian/Desktop/EasyDone/views/template/account.html').toString();
var item=fs.readFileSync('/Users/soft_tangxiaoxian/Desktop/EasyDone/views/template/item.html').toString();
var order=fs.readFileSync('/Users/soft_tangxiaoxian/Desktop/EasyDone/views/template/order.html').toString();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/userLogin', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  res.redirect('assert/Frame.html')
});

router.get('/fetchOrder', function(req, res, next) {
  var id=req.query.id;
  if (id=='new_item'){
    res.send(order);
  }else if (id=='balance'){
    res.send(account);
  }else{
    res.send('');
  }
});

module.exports = router;
