const moment = require('moment');
// DPO Credentials:
const serviceType = 48629;
const companyToken = 'EE5055EA-90F6-4212-A4DE-020DC6742CE0';

// Payment Template
const dpoPaymentTemplate = {
  API3G: {
    CompanyToken: companyToken,
    Request: 'createToken',
    Transaction: {
      PaymentAmount: '',
      PaymentCurrency: 'TZS',
      CompanyRef: '49FKEOA',
      RedirectURL: 'https://www.lodge.co.tz/success',
      BackURL: 'https://www.lodge.co.tz/offer',
      CompanyRefUnique: 0,
      PTL: 15,
      PTLtype: 'hours',
      DefaultPayment: 'MO',
      DefaultPaymentCountry: 'tanzania',
      DefaultPaymentMNO: 'mpesa',
      customerFirstName: '',
      customerLastName: '',
      customerZip: 255,
      customerCity: 'Dar',
      customerCountry: 'TZ',
      customerEmail: '',
      customerAddress: 'DSM',
      customerPhone: '',
    },
    Services: {
      Service: {
        ServiceType: serviceType,
        ServiceDescription: '',
        ServiceDate: moment().format('YYYY-MM-DD hh:mm'),
      },
    },
  },
};

module.exports = dpoPaymentTemplate;
