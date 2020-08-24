var stripeHandler = StripeCheckout.configure({
  key:
    "pk_test_51H4HxfEzvu7bwBd3AqPbAwjJNEeaRrK6hYyGkYkAQXQLoz9SakpgFOpSJHAdfRJSDjk1rUJVsFURfqCLkLTYBjMa002OUbnnwW",
  locale: "auto",
  token: function (token) {
    fetch("/shoes/purchase", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        stripeTokenId: token.id,
        items: document.getElementsByClassName("shoeName")[0].innerText,
        total:
          parseFloat(
            document
              .getElementsByClassName("purchase")[0]
              .innerText.replace("Purchase For $", "")
          ) * 100,
      }),
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        alert(data.message);
      })
      .catch(function (error) {
        console.error(error);
      });
  },
});

function purchaseClicked() {
  var priceElement = document.getElementsByClassName("purchase")[0];
  var price =
    parseFloat(priceElement.innerText.replace("Purchase For $", "")) * 100;
  stripeHandler.open({
    amount: price,
    billingAddress: true,
    name: 'XtockS',
    description: document.getElementsByClassName("shoeName")[0].innerText,
  });
}
