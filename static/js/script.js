let $selectedProduct

var handler = StripeCheckout.configure({
  key: 'pk_test_hKJW2ljsRbPRpaXjPRQZ8xEg',
  locale: 'auto',
  token: sendToGCF,
})

function sendToGCF(token) {
  $.ajax("https://us-central1-stripeexample-187817.cloudfunctions.net/cloudCharge", {
    type: post,
    crossDomain: true,
    contentType: "application/json",
    data: {
      token: token.id,
      productId: $selectedProduct.attr('data-product-id'),
    },
    success(data) {
      console.log("data: ", data)
      alert(data.id)
      window.location.href = "/thanks.html"
    },
    failure: console.error,
  })
}

$(".buy-it").click(function(e) {
  console.log("buying something")

  $selectedProduct = $(this)
  
  const price = $selectedProduct.attr("data-price")

  // Open Checkout with further options:
  handler.open({
    name: 'Demo Site',
    description: '2 widgets',
    amount: price,
  })

  e.preventDefault()
})

// Close Checkout on page navigation:
window.addEventListener('popstate', function() {
  handler.close()
})
