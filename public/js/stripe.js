const stripe = Stripe(
  'pk_test_51RVaweGd7Bbmzen8dOtBNAn49Mk5btbSM5JobouA9yWAcuJMKs0T6vK1dAYp6Ov2EtdIPya6t5QzK7WotK0b9VdL00rpf97etH'
);

const bookBtn = document.getElementById('book-tour');

const bookTour = async (tourId) => {
  try {
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);

    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};

if (bookBtn)
  bookBtn.addEventListener('click', (e) => {
    bookBtn.textContent = 'Processing...';
    const { tourId } = e.target.dataset;
    bookTour(tourId);
  });
