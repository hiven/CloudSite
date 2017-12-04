const stripe = require("stripe")("sk_test_GMI2xahwIRS7LUwjlDsR5o4O")
const Datastore = require('@google-cloud/datastore')

const ds = Datastore({
  projectId: "stripeexample-187817",
})

exports.cloudCharge = function cloudCharge(req, res) {
  const { token = "tok_visa", productId = 5639445604728832 } = req.body

  console.log("token: ", token)
  console.log("productId: ", productId)

  const key = ds.key(["product", productId])
  ds.get(key, (err, product) => {
    stripe.charges.create({
      amount: product.price,
      currency: "usd",
      source: token,
      description: `GIFs of ${product.set}`,
    }, (err, charge) => {
      // set JSON content type and CORS headers for the response
      res.header('Content-Type', 'application/json')
      res.header('Access-Control-Allow-Origin', '*')
      res.header('Access-Control-Allow-Headers', 'Content-Type')

      res.status(200).send(charge)
    })
  })
}

