const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    firstName: {
      type: String,
      require: [true, 'Please enter first Name'],
    },
    lastName: {
      type: String,
      require: [true, 'Please enter last Name'],
    },
    email: {
      type: String,
      require: [true, 'Please enter email'],
    },
    phone: {
      type: String,
      require: [true, 'Please enter last phone number'],
    },
    price: {
      type: Number,
      require: [true, 'Please enter last phone number'],
    },
    service: {
      type: String,
    },
    status: {
      type: String,
      default: 'Attempt',
    },
    transtoken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Payment', paymentSchema);
