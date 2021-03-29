const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: 'Booking must belong to a User',
    },
    consultant: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Booking must have a consultant id']
    },
    price: {
        type: Number,
        required: [true, 'Booking must have a price']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    paid: {
        type: Boolean,
        default: true
    }
});

bookingSchema.pre(/^find/, function(next) {
    this.populate({
        path: 'user',
        select: 'name'
    }).populate({
        path: 'consultant',
        select: 'name'
    })
    next();
})

const Booking = mongoose.model('Booking', bookingSchema)

module.exports = Booking;