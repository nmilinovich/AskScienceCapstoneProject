import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import './LoginForm.css'

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data?.errors) setErrors(data.errors);
      }
    );
  };

  const handleDemoUser = () => {
    return dispatch(sessionActions.login({ credential: 'Demo-lition', password: 'password' }))
    .then(closeModal())
  }

  return (
    <div className='loginModal'>
      <h1 className='loginH1'>Log In</h1>
      <form onSubmit={handleSubmit} className='loginModalForm'>
        <div className='loginDiv'>
          <label>
            <input
              placeholder='Username or Email'
              type="text"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
            />
          </label>
        </div>
        <div className='loginDiv'>
          <label>
            <input
            placeholder='Password'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>

        {errors.credential && <div className=''>{errors.credential}</div>}
        <button type="submit" className='loginModalBtn'>Log In</button>
      </form>
      <div>
        <button className='demoUserLogin' onClick={() => handleDemoUser()}>Login as Demo User</button>
      </div>
    </div>
  );
}

export default LoginFormPage;
