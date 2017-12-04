
let $selectedProduct

var handler = StripeCheckout.configure({
  key: 'pk_test_hKJW2ljsRbPRpaXjPRQZ8xEg',
  locale: 'auto',
  token: function(token) {
    console.log("$selectedProduct: ", $selectedProduct)
    // You can access the token ID with `token.id`.
    // Get the token ID to your server-side code for use.

    $.ajax("https://us-central1-stripeexample-187817.cloudfunctions.net/cloudCharge", {
      data: {
        token: token.id,
        productId: $selectedProduct.attr('data-product-id'),
      },
      success(data) {
        console.log("data: ", data)
        alert(data.id)
        window.location.href = "/thanks.html"
      },
    })
  },
})

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
