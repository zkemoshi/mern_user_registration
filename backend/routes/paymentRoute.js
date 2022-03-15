const express = require('express');
const router = express.Router();
const {
  createInvoice,
  deleteInvoice,
  getInvoices,
  getInvoice,
  payInvoice,
  confirmInvoice,
} = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(protect, createInvoice).get(protect, getInvoices);
router.route('/:id').get(getInvoice).delete(deleteInvoice);

router.route('/pay/:token').get(payInvoice);
router.route('/confirm/:token').get(confirmInvoice);

module.exports = router;
