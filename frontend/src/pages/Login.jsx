import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaUser } from 'react-icons/fa';
import Spinner from '../components/Spinner';

import authContext from '../context/auth/authContext';

function Login() {
  const { login, loading, token, error, clearErrors } = useContext(authContext);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };
    login(userData);
    setFormData({
      email: '',
      password: '',
    });
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
    if (error) {
      toast.error(error);
      clearErrors();
    }
  }, [token, error]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <main className='access-section'>
        <section className='heading'>
          <h1>
            <FaUser /> Login
          </h1>
        </section>

        <section className='form'>
          <form onSubmit={onSubmit}>
            <div className='form-group'>
              <input
                type='email'
                className='form-control'
                id='email'
                name='email'
                required
                value={email}
                placeholder='Email | Phone'
                onChange={onChange}
              />
            </div>

            <div className='form-group'>
              <input
                type='password'
                className='form-control'
                id='password'
                name='password'
                required
                value={password}
                placeholder='Password or GroupId'
                onChange={onChange}
              />
            </div>

            <div className='form-group'>
              <button type='submit' className='btn btn-block'>
                Login
              </button>
            </div>
          </form>
          <div className='access-buttons'>
            <Link to='/register' className='btn btn-sign'>
              Sign Up
            </Link>
            <Link to={'/forgot-password'} className='forgot-password'>
              Forgot password ?
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

export default Login;
