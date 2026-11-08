const handlePayment = (totalAmount) => {
  const options = {
    key: "YOUR_RAZORPAY_KEY_ID", // നിങ്ങളുടെ റേസർപേ കീ ഇവിടെ നൽകുക
    amount: totalAmount * 100, // പൈസയിൽ (Paise) ആണ് തുക നൽകേണ്ടത് (₹500 എന്നാൽ 50000)
    currency: "INR",
    name: "Sreerudra by Nandu",
    description: "Sacred Collection Purchase",
    image: "https://your-logo-url.png", // ലോഗോ ഉണ്ടെങ്കിൽ നൽകാം
    handler: function (response) {
      alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
      // ഇവിടെ പേയ്മെന്റ് വിജയിച്ചാൽ ബാക്ക്എൻഡിലേക്ക് ഓർഡർ സേവ് ചെയ്യുന്ന API കോൾ കൊടുക്കാം
    },
    prefill: {
      name: "Customer Name",
      email: "customer@example.com",
      contact: "Phone Number"
    },
    theme: {
      color: "#C59A45" // നിങ്ങളുടെ തീം കളർ
    }
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
};