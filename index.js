const stripe = require("stripe")("sk_test_Gl20U8POByRHxfJ9ozHOPotK")
const Datastore = require('@google-cloud/datastore')

const ds = Datastore({
  projectId: "stripeexample-187817",
})

exports.cloudCharge = function cloudCharge(req, res) {
  const { stripeToken, productId } = req.body

  const key = ds.key(["product", parseInt(productId, 10)])
  ds.get(key, (err, product) => {
    stripe.charges.create({
      amount: product.price,
      currency: "usd",
      source: stripeToken,
      description: `GIFs of ${product.set}`,
    }, (err, charge) => {
      if(err) {
        console.error(err)
        res.status(500).send(err)
      }
      else {
        res.status(303).redirect(`https://henry-stripe.ngrok.io/thanks.html?charge=${charge.id}`)
      }
    })
  })
}

