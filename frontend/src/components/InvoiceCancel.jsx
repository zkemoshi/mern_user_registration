import React from 'react';

function InvoiceCancel() {
  return (
    <>
      <section className='heading remark'>
        <h1>Thank You</h1>
        <p>This Invoice has been Cancelled</p>
      </section>
      <section className='content remark-card'>
        <h4>For more information contact us: </h4>
        <p>WhatsApp: {`+255 718 137722`}</p>
        <p>Email: {`zkemoshi@gmail.com`} </p>
      </section>
    </>
  );
}

export default InvoiceCancel;
