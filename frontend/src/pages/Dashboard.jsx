import authContext from '../context/auth/authContext';
import paymentContext from '../context/payment/paymentContext';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';

function Dashboard() {
  const navigate = useNavigate();
  const { logout, token, loadUser, user, loading } = useContext(authContext);
  const { addInvoice } = useContext(paymentContext);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    price: '',
    service: '',
  });
  const { firstName, lastName, phone, email, price, service } = formData;

  useEffect(() => {
    loadUser();
    if (!token) {
      navigate('/login');
    }
  }, [token]);

  const Logout = () => {
    logout();
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addInvoice(formData);
    setFormData({
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      price: '',
      service: '',
    });
    toast.success(`Invoice Created`);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <section className='logout'>
        <Link to='/invoice-list' className='invoice-link'>
          Invoices
        </Link>
        <span onClick={Logout}>Log Out</span>
      </section>
      <section className='heading'>
        <h1>Welcome, {user && user.name} </h1>
        <p>Create Invoice</p>
      </section>
      <section className='content'>
        <form onSubmit={onSubmit} className='invoice'>
          <div className='invoice-group'>
            <div className='name-group'>
              <input
                type='text'
                className='form-control'
                id='firstName'
                name='firstName'
                value={firstName}
                required
                placeholder='Customer First Name'
                onChange={onChange}
              />
              <input
                type='text'
                className='form-control'
                id='lastName'
                name='lastName'
                required
                value={lastName}
                placeholder='Customer Last Name'
                onChange={onChange}
              />
            </div>
            <input
              type='text'
              className='form-control'
              id='email'
              name='email'
              required
              value={email}
              placeholder='Customer Email'
              onChange={onChange}
            />
            <input
              type='text'
              className='form-control'
              id='phone'
              name='phone'
              required
              value={phone}
              placeholder='Customer Phone'
              onChange={onChange}
            />
            <input
              type='text'
              className='form-control'
              id='price'
              name='price'
              required
              value={price}
              placeholder='Price'
              onChange={onChange}
            />
            <input
              type='text'
              className='form-control'
              id='service'
              name='service'
              required
              value={service}
              placeholder='Service'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <button type='submit' className='btn btn-block'>
              Send Invoice
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Dashboard;
