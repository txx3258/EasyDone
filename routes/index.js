var express = require('express');
var router = express.Router();
var fs = require('fs');
var ejs = require("ejs");

var account=fs.readFileSync('/root/EasyDone/views/template/account.html').toString();
var item=fs.readFileSync('/root/EasyDone/views/template/item.html').toString();
var order=fs.readFileSync('/root/EasyDone/views/template/order.html').toString();

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

router.get('/success', function(req, res, next) {
  res.render('index', { title: 'success' });
});

router.get('/cancel', function(req, res, next) {
  res.render('index', { title: 'cancel' });
});


router.get('/pingpp',function(req,res,next){
  var channel=req.query.channel,
      amount=req.query.amount;

  var pingpp = require('pingpp')('sk_test_n5Cmj5GGqDm98SKaPKejLafH');
// pingpp.parseHeaders(/*headers*/); // 把从客户端传上来的 Headers 传到这里

  var extra = {};
  switch (channel) {
    case 'alipay_pc_direct':
      extra = {
        'success_url': 'http://218.244.133.25:3000/success',
        'cancel_url': 'http://218.244.133.25:3000/cancel'
      };
      break;
    case 'upacp_wap':
      extra = {
        'result_url': 'http://www.yourdomain.com/result?code='
      };
      break;
  }
  var crypto = require('crypto');
  var order_no = crypto.createHash('md5')
      .update(new Date().getTime().toString())
      .digest('hex').substr(0, 16);
  pingpp.charges.create({
    order_no:  order_no,
    app:       { id: "app_nDiPiDbLibrDr58i" },
    channel:   channel,
    amount:    amount,
    client_ip: "218.244.133.25",
    currency:  "cny",
    subject:   "一找轻松",
    body:      "找——企业注册",
    extra:     extra
  }, function(err, charge) {
    // YOUR CODE
    //console.log(err);
    res.json(charge);
  });


})

module.exports = router;


