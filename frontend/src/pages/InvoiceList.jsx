import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import paymentContext from '../context/payment/paymentContext';

function InvoiceList() {
  const { invoices, getInvoices, deleteInvoice } = useContext(paymentContext);
  let increment = 1;

  const remove = (id) => {
    if (window.confirm('Confirm Delete..?')) {
      deleteInvoice(id);
      toast.error('Invoice deleted..');
    }
  };

  useEffect(() => {
    getInvoices();
  }, []);
  return (
    <>
      <div className='password-reset container'>
        <header className='header'>
          <p>Invoice List</p>
          <Link className='forgotPasswordLink' to='/'>
            Create Invoice
          </Link>
        </header>

        <div className='invoice-list'>
          {invoices && invoices.length > 0 && (
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Email</th>
                  <th>Service</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr key={invoice._id}>
                    <td>{increment++}</td>
                    <td>{invoice.email}</td>
                    <td>{invoice.service}</td>
                    <td>
                      {invoice.price
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    </td>
                    <td>{invoice.status}</td>
                    <td>22/02/2022</td>
                    <td className='remove' onClick={() => remove(invoice._id)}>
                      Remove
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {invoices && invoices.length === 0 && (
            <p>There are no Invoices yet</p>
          )}
        </div>
      </div>
    </>
  );
}

export default InvoiceList;
