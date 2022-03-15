import paymentContext from '../context/payment/paymentContext';
import { useEffect, useContext } from 'react';

const queryParams = new URLSearchParams(window.location.search);
const tokenId = queryParams.get('TransactionToken');

function Remark() {
  const { confirmInvoice } = useContext(paymentContext);

  useEffect(() => {
    confirmInvoice(tokenId);
  }, []);
  return (
    <>
      <section className='heading remark'>
        <h1>Thank You</h1>
        <p>For Your Business</p>
      </section>
      <section className='content remark-card'>
        <h4>For more information contact us: </h4>
        <p>WhatsApp: {`+255 718 137722`}</p>
        <p>Email: {`zkemoshi@gmail.com`} </p>
      </section>
    </>
  );
}

export default Remark;
