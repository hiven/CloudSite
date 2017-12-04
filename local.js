// const { secretKey } = require("./config.js")
// const stripe = require("stripe")("sk_test_GMI2xahwIRS7LUwjlDsR5o4O")
// const admin = require("firebase-admin")
// const functions = require("firebase-functions")

// admin.initializeApp({
//   credential: admin.credential.applicationDefault(),
// })

// admin.initializeApp(functions.config().firebase)

// const db = admin.firestore()


/*
 * Makes a hardcoded $20 charge
 *
 * @param {Object} req Cloud Function request context
 * @param {Object} res Cloud Function response context
 */

const Datastore = require('@google-cloud/datastore')

const ds = Datastore({
  projectId: "stripeexample-187817",
})

function read(id, cb) {
  // const key = ds.key(["product", parseInt(id, 10)])
  const key = ds.key(["product", 5639445604728832])

  ds.get(key, (err, entity) => {
    if (!err && !entity) {
      err = {
        code: 404,
        message: 'Not found',
      }
    }
    if (err) {
      cb(err)
      return
    }
    cb(null, entity)
  })
}

function hardcodedCharge(req, res) {
  const { token, productId, description } = req.body

  console.log("token: ", token)
  console.log("productId: ", productId)
  console.log("description: ", description)

  read(productId, (err, product) => {
    if (err) {
      res.status(400).send(err)
    }
    else {
      res.status(200).send("read: ", product)
    }
  })

  res.status(400).send("hard coded")

  // if (token) {
  //   console.log("there was a token", token)

  //   db.collection("products").doc(productId).get()
  //     .then(doc => {
  //       console.log("inside first then")
  //       if (!doc.exists) {
  //         console.log("no such document")
  //         new Error("No such document!")
  //       }
  //       const price = doc.data().price

  //       console.log(doc.id, doc.data())
  //       return price
  //     // }).then(price => {
  //     //   stripe.charges.create({
  //     //     amount: price,
  //     //     currency: "usd",
  //     //     source: token,
  //     //     description: description || "GCF Charge",
  //     //   })
  //     }).then(charge => {
  //       console.log("last then: ", charge)
  //       res.status(200).send(charge.id)
  //     }).catch(err => {
  //       console.log("catch: ", err)
  //       res.status(400).send(err)
  //     })
  // }
  // else {
  //   console.log("no token", token)
  //   res.status(400).send("no token")
  // }
}

