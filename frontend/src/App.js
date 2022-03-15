import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthState from './context/auth/AuthState';
import PaymentState from './context/payment/PaymentState';
import BackUrl from './pages/BackUrl';
import Dashboard from './pages/Dashboard';
import ForgotPassword from './pages/ForgotPassword';
import Invoice from './pages/Invoice';
import InvoiceList from './pages/InvoiceList';
import Login from './pages/Login';
import Register from './pages/Register';
import Remark from './pages/Remark';
import setAuthToken from './utils/setAuthToken';

// Initiate token header...
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <>
      <AuthState>
        <PaymentState>
          <Router>
            <div className='container'>
              <Routes>
                {/* <Route path='/' element={<Navbar />}>
                <Route path='/collection' element={<Collection />} />
                <Route path='/loan' element={<Loan />} />
                <Route path='/profile' element={<Profile />} />
              </Route> */}
                <Route path='/' element={<Dashboard />} />
                <Route path='/invoice' element={<Invoice />} />
                <Route path='/remark' element={<Remark />} />
                <Route path='/backurl' element={<BackUrl />} />
                <Route path='/invoice-list' element={<InvoiceList />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/forgot-password' element={<ForgotPassword />} />
              </Routes>
            </div>
          </Router>
        </PaymentState>
      </AuthState>
      <ToastContainer />
    </>
  );
}

export default App;
