import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import authContext from '../context/auth/authContext';

// Get Query Params
const queryParams = new URLSearchParams(window.location.search);
const resetLink = queryParams.get('resetLink');
console.log(resetLink);

function ResetPassword() {
  const { resetPassword, error, clearErrors } = useContext(authContext);
  const [formData, setFormData] = useState({
    newPassword: '',
    verifyPassword: '',
    resetLink,
  });

  const { newPassword, verifyPassword } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== verifyPassword) {
      toast.error('Password do not Match');
      setFormData((prevState) => ({
        ...prevState,
        newPassword: '',
        verifyPassword: '',
      }));
    } else {
      resetPassword(formData);
      setFormData({
        newPassword: '',
        verifyPassword: '',
      });
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearErrors();
    }
  }, [error]);

  return (
    <div className='password-reset container'>
      <header className='header'>
        <p>Reset Password</p>
        <Link className='forgotPasswordLink' to='/login'>
          Sign In
        </Link>
      </header>

      <main>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='password'
              className='emailInput'
              placeholder='New newPassword'
              id='newPassword'
              value={newPassword}
              name='newPassword'
              required
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='emailInput'
              placeholder='Confirm newPassword'
              id='verifyPassword'
              name='verifyPassword'
              required
              value={verifyPassword}
              onChange={onChange}
            />
          </div>

          <div className='signInBar'>
            <button type='submit' className='signInText'>
              Create New Password
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default ResetPassword;
