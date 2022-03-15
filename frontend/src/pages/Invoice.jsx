import paymentContext from '../context/payment/paymentContext';
import { useContext, useEffect } from 'react';
import moment from 'moment';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';

// Get Query Params
const queryParams = new URLSearchParams(window.location.search);
const tokenId = queryParams.get('id');
if (tokenId) localStorage.setItem('localToken', tokenId);

function Invoice() {
  const { getInvoice, current, loading } = useContext(paymentContext);

  useEffect(() => {
    if (localStorage.getItem('localToken')) {
      const token = localStorage.getItem('localToken');
      console.log(token);
      getInvoice(token);
    }
  }, []);

  const payNow = () => {
    const token = localStorage.getItem('localToken');
    if (token) {
      window.location.assign(
        `http://secure.3gdirectpay.com/dpopayment.php?ID=${token}`
      );
    } else {
      toast.error(`Click Invoice in Your email`);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <section className='heading invoice-header'>
        <h1>Invoice</h1>
      </section>
      <section className='address'>
        <p>{current && `${current.firstName} ${current.lastName}`}</p>
        <p> {current && `Email: ${current.email}`}</p>
        <p>Invoice: #13344</p>
        <p>{moment().format('MMMM Do YYYY, dddd')}</p>
      </section>
      <section className='content invoice-content'>
        <div className='service'>
          <span className='item'>{current && `${current.service}`}</span>
          <span className='price'>{current && `TZS ${current.price}`}</span>
        </div>
        <div className='tax'>
          <span className='item'>{`VAT (18%)`}</span>
          <span className='price'>{`TZS 0.00`}</span>
        </div>
        <div className='discount'>
          <span className='item'>{`Discount`}</span>
          <span className='price'>{`TZS 0.00`}</span>
        </div>
        <div className='total'>
          <span className='item'>{`TOTAL`}</span>
          <span className='price'>{current && `TZS ${current.price}`}</span>
        </div>
      </section>
      <section className='invoice-pay'>
        <button className='btn' onClick={payNow}>
          Pay Now
        </button>
      </section>
      <section className='invoice-footer'>
        <p>{`Z&C Technologies Ltd | Box 31338 DSM | +255 718 137 772 | zkemoshi@gmail.com`}</p>
      </section>
    </>
  );
}

export default Invoice;
