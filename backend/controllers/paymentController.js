const moment = require('moment');
const emailKey = process.env.SENDGRID_API_KEY;
const sgMail = require('@sendgrid/mail');
const axios = require('axios');
const { XMLParser, XMLBuilder, XMLValidator } = require('fast-xml-parser');
const dpoPaymentTemplate = require('../utils/dpoPaymentDetails');

const Payment = require('../models/paymentModel');

// @desc      Get all invoices
// @route     GET /api/v1/payments
// @access    Private
exports.getInvoices = async (req, res, next) => {
  const invoices = await Payment.find({ user: req.user.id });

  if (invoices) res.status(200).json(invoices);
};

// @desc      Get single invoice
// @route     GET /api/v1/payments/:id
// @access    Public
exports.getInvoice = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, message: `Get an invoice ${req.params.id}` });
};

// @desc      Create a new invoice
// @route     POST /api/v1/payments
// @access    Private
exports.createInvoice = async (req, res, next) => {
  const { firstName, lastName, price, email, phone, service } = req.body;

  dpoPaymentTemplate.API3G.Transaction.PaymentAmount = price;
  dpoPaymentTemplate.API3G.Transaction.customerFirstName = firstName;
  dpoPaymentTemplate.API3G.Transaction.customerLastName = lastName;
  dpoPaymentTemplate.API3G.Transaction.customerEmail = email;
  dpoPaymentTemplate.API3G.Transaction.customerPhone = phone;
  dpoPaymentTemplate.API3G.Services.Service.ServiceDescription = service;

  // converting Javascript Object to XML
  const builder = new XMLBuilder();
  const data = builder.build(dpoPaymentTemplate);

  // Request for Transaction Token from DPO Server
  const config = {
    header: {
      'Content-Type': 'application/xml',
    },
  };

  const response = await axios.post(
    'https://secure.3gdirectpay.com/API/v6/',
    data,
    config
  );

  const parser = new XMLParser();
  let transData = parser.parse(response.data);
  const transtoken = transData.API3G.TransToken;
  // Create a new Payment
  const newpay = new Payment({
    firstName,
    lastName,
    email: email.toLowerCase(),
    phone,
    price,
    service,
    user: req.user.id,
    transtoken,
  });
  // Save to DB
  const payment = await newpay.save();
  // Sending Email after Registering
  sgMail.setApiKey(emailKey);
  const msg = {
    to: [`zkemoshi@gmail.com`, `${email}`],
    from: 'sales@lodge.co.tz',
    subject: `Invoice Notice`,
    html: `
      <p>Please find the link for Payment of Your Invoice </p>
      <ul>
        <li>Price : ${price}</li>
      </ul>
      <p>
        <a href='http://tupohapa.herokuapp.com/invoice?id=${transtoken}'>PAY NOW</a>
      </p>
    `,
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent');
    })
    .catch((error) => {
      console.error(error);
    });

  res.status(201).json(payment);
};

// @desc      Pay  invoice
// @route     GET /api/v1/payments/pay/:id
// @access    Public
exports.payInvoice = async (req, res, next) => {
  const payment = await Payment.findOne({ transtoken: req.params.token });

  if (payment) {
    res.status(200).json(payment);
  }
};

// @desc      Confirm  Payment
// @route     GET /api/v1/payments/confirm/:id
// @access    Public
exports.confirmInvoice = async (req, res, next) => {
  const payment = await Payment.findOne({ transtoken: req.params.token });

  // Update Status
  const updatedPyament = await Payment.findByIdAndUpdate(
    payment._id,
    { $set: { status: 'Paid' } },
    { new: true }
  );
  res.status(200).json(updatedPyament);
};

// @desc      Delete a Invoice
// @route     DELETE /api/v1/payments/:id
// @access    Private
exports.deleteInvoice = async (req, res, next) => {
  try {
    await Payment.findByIdAndRemove(req.params.id);

    res
      .status(200)
      .json({ success: true, message: `Deleted an invoice ${req.params.id}` });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
