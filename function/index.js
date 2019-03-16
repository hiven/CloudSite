var app = require('express')();
var http = require('http').Server(app);
var stripe = require('stripe')(
  "fbUcgVE"
);
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//get token from body

//initiate a one-off charge for a customer
exports.chargeCustomer = app.post("/", function chargeCustomer (req,res){
  stripe.charges.create({
    source: req.body.stripeToken,
    currency: 'usd',
    amount:999
  },function(err, charge) {
    if(err) {
      return res.send(JSON.stringify(err));
    }
    res.send(JSON.stringify(charge));
  });
});
