const stripe = require('stripe')('sk_test_51IaDGzHjQP2bRaaT6WJIyG6uVnpPHeMQMa5eo2tcj0Vw6mGQJhbrfUK8xjlD3ZYmjeKdQI2whEa48xiYTgH3T9Ti00H6A8JCH5');
const User = require('./../models/userModel');
const Booking = require('./../models/bookingModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getCheckoutSession = catchAsync (async (req, res, next) => {
    const consultant = await User.findById(req.params.consultantId);
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        success_url: `${req.protocol}://${req.get('host')}/?consultant=${req.params.consultantId}&user=${res.locals.user.id}&price=${consultant.price}`,
        cancel_url: `${req.protocol}://${req.get('host')}/users/${consultant.slug}`,
        customer_email: res.locals.user.email,
        client_reference_id: req.params.consultantId,
        line_items: [
            {
                name: `${consultant.name} Consultant`,
                description: consultant.tag,
                amount: consultant.price * 100,
                currency: 'CAD',
                quantity: 1
            }
        ]
    });

    res.status(200).json({
        status: 'success',
        session
    })
});

exports.createBookingCheckout = catchAsync (async (req, res, next) => {
    const {consultant, user, price} = req.query;

    if(!consultant && !user && !price) return next();

    await Booking.create({consultant, user, price});

    res.redirect(req.originalUrl.split('?')[0])
});