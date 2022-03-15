import { useState } from 'react';
import { Link } from 'react-router-dom';

function ForgotPassword() {
  const [email, setEmail] = useState('');

  const onChange = (e) => setEmail(e.target.value);

  const onSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div className='password-reset container'>
      <header className='header'>
        <p>Forgot Password</p>
        <Link className='forgotPasswordLink' to='/login'>
          Sign In
        </Link>
      </header>

      <main>
        <form onSubmit={onSubmit}>
          <input
            type='email'
            className='emailInput'
            placeholder='Email'
            id='email'
            value={email}
            onChange={onChange}
          />

          <div className='signInBar'>
            <button type='submit' className='signInText'>
              Send Reset Link
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default ForgotPassword;
