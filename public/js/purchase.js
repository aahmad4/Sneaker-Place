const stripeHandler = StripeCheckout.configure({
  key:
    "pk_test_51H4HxfEzvu7bwBd3AqPbAwjJNEeaRrK6hYyGkYkAQXQLoz9SakpgFOpSJHAdfRJSDjk1rUJVsFURfqCLkLTYBjMa002OUbnnwW",
  locale: "auto",
  token: async (token) => {
    try {
      const response = await fetch("/shoes/purchase", {
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
                .innerText.replace("$", "")
            ) * 100,
        }),
      });

      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error(error);
    }
  },
});

const purchaseClicked = () => {
  const priceElement = document.getElementsByClassName("purchase")[0];
  const price = parseFloat(priceElement.innerText.replace("$", "")) * 100;
  stripeHandler.open({
    amount: price,
    billingAddress: true,
    name: "XtockS",
    description: document.getElementsByClassName("shoeName")[0].innerText,
    image:
      "https://pbs.twimg.com/profile_images/684418269306945536/HDodeG76_400x400.jpg",
  });
};
