const stripe = require("stripe")("sk_test_GMI2xahwIRS7LUwjlDsR5o4O")
const Datastore = require('@google-cloud/datastore')

const ds = Datastore({
  projectId: "stripeexample-187817",
})

exports.cloudCharge = function cloudCharge(req, res) {
  console.log("req: ", req)
  console.log("req.method: ", req.method)

  // set JSON content type and CORS headers for the response
  res.header('Content-Type', 'application/json')
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')

  // respond to CORS preflight requests
  if (req.method === 'OPTIONS') {
    res.status(204).send()
  }

  const { token, productId } = req.body

  console.log("token: ", token)
  console.log("productId: ", productId)

  const key = ds.key(["product", parseInt(productId, 10)])
  ds.get(key, (err, product) => {
    stripe.charges.create({
      amount: product.price,
      currency: "usd",
      source: token,
      description: `GIFs of ${product.set}`,
    }, (err, charge) => {
      res.status(200).send(charge)
    })
  })
}

