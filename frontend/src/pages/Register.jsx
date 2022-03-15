import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaUser } from 'react-icons/fa';
import Spinner from '../components/Spinner';

import authContext from '../context/auth/authContext';

function Register() {
  const { register, loading, token, error, clearErrors } =
    useContext(authContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    password2: '',
  });

  const navigate = useNavigate();

  const { name, email, phone, password, password2 } = formData;

  useEffect(() => {
    if (token) {
      navigate('/');
    }
    if (error) {
      toast.error(error);
      clearErrors();
    }
  }, [token, error]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error('Passwords do not match');
    } else {
      const userData = {
        name,
        email,
        password,
        phone,
      };
      register(userData);
      setFormData({
        name: '',
        email: '',
        phone: '',
        password: '',
        password2: '',
      });
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <div className='access-section'>
        <section className='heading'>
          <h1>
            <FaUser /> Register
          </h1>
        </section>

        <section className='form'>
          <form onSubmit={onSubmit}>
            <div className='form-group'>
              <input
                type='text'
                className='form-control'
                id='name'
                name='name'
                value={name}
                placeholder='Enter your name'
                onChange={onChange}
              />
            </div>
            <div className='form-group'>
              <input
                type='email'
                className='form-control'
                id='email'
                name='email'
                value={email}
                placeholder='Enter your email'
                onChange={onChange}
              />
            </div>
            <div className='form-group'>
              <input
                type='phone'
                className='form-control'
                id='phone'
                name='phone'
                value={phone}
                placeholder='Enter your phone'
                onChange={onChange}
              />
            </div>
            <div className='form-group'>
              <input
                type='password'
                className='form-control'
                id='password'
                name='password'
                value={password}
                placeholder='Enter password'
                onChange={onChange}
              />
            </div>
            <div className='form-group'>
              <input
                type='password'
                className='form-control'
                id='password2'
                name='password2'
                value={password2}
                placeholder='Confirm password'
                onChange={onChange}
              />
            </div>
            <div className='form-group'>
              <button type='submit' className='btn btn-block'>
                Submit
              </button>
            </div>
          </form>
          <Link to='/login'>
            Already have an Account?{' '}
            <span className='forgot-password'>Login</span>
          </Link>
        </section>
      </div>
    </>
  );
}

export default Register;
