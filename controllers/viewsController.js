const User = require('../models/userModel');
const Booking = require('../models/bookingModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.alerts = (req, res, next) => {
  const { alert } = req.query;
  if (alert === 'booking')
    res.locals.alert =
      "Your booking was successful! Please check your email for a confirmation. If your booking doesn't show up here immediately, please come back later.";
  next();
};

exports.getConsultants = catchAsync(async (req, res, next) => {
  let consultants;
  if(req.query.search){
    const regex = new RegExp(escapeRegex(req.query.search), 'gi');
    consultants = await User.find({$and:[{ $or: [{name: regex},{tag: regex}]}, {userType: 'consultant'}]});
  } else if (req.query.search === null) {
    consultants = await User.find({ userType: 'consultant' });
  } else {
    consultants = await User.find({ userType: 'consultant' });
  }
  res.status(200).render('search', {
    title: 'Search',
    consultants
  });
});

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

exports.getConsultant = catchAsync(async (req, res, next) => {
  // 1) Get the data, for the requested tour (including reviews and guides)
  const consultant = await User.findOne({ slug: req.params.slug });

  if (!consultant) {
    return next(new AppError('There is no consultant with that name.', 404));
  }

  // 2) Build template
  // 3) Render template using data from 1)
  res.status(200).render('details', {
    title: `${consultant.name} Consultant`,
    consultant
  });
});

exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: 'Login'
  });
};

exports.getSignup = (req, res) => {
  res.status(200).render('signup', {
    title: 'Sign Up'
  });
};

exports.getAbout = (req, res) => {
  res.status(200).render('about', {
    title: 'About'
  });
};

exports.getWorks = (req, res) => {
  res.status(200).render('works', {
    title: 'Works'
  });
};

exports.getTerms = (req, res) => {
  res.status(200).render('terms', {
    title: 'Terms and Conditions'
  });
};

exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Your account'
  });
};

exports.getMyBookings = catchAsync( async (req, res, next) => {
  const bookingClient = await Booking.find({ user: res.locals.user.id })
  const consultantIds = bookingClient.map(el => el.consultant)
  const consultants = await User.find({_id: {$in: consultantIds} });

  const bookingConsultant = await Booking.find({ consultant: res.locals.user.id })
  const userIds = bookingConsultant.map(el => el.user)
  const users = await User.find({_id: {$in: userIds} });

  res.status(200).render('bookings', {
    title: 'My Bookings',
    bookingClient,
    consultantIds,
    consultants,
    bookingConsultant,
    userIds,
    users
  })
});
