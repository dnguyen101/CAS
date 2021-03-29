import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe('pk_test_51IaDGzHjQP2bRaaTPJfmdjY1U4i1awwFzBtafgj3wRsw5XCKPGl19R9SpmEv7dsAecoMRG2lgJZcTdTRRBxeAS4400TVwO7KIp');

export const bookConsultant = async consultantId => {
    try {
        const session = await axios(`/api/v1/bookings/checkout-session/${consultantId}`)
        await stripe.redirectToCheckout({
            sessionId: session.data.session.id
        })
    } catch (err) {
        showAlert('error', err.response.data.message);
    }
}