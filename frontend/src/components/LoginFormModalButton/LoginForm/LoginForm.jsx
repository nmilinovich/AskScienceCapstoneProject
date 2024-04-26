import { useState } from 'react';
import * as sessionActions from '../../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../../context/Modal'
// import { useNavigate, useLocation } from 'react-router-dom';
import './LoginForm.css'
function LoginForm() {
  // const navigate = useNavigate()
  // const { state } = useLocation()
  const { closeModal } = useModal()
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrors({});
    dispatch(sessionActions.login({ credential, password }))
    .then(closeModal)
    .catch(
      async (res) => {
        const data = await res.json();
        if (data?.errors) {
          setErrors(data.errors);
        }
      }
    )
  };

  const handleDemoUser = (e) => {
    e.preventDefault()
    return dispatch(sessionActions.login({ credential: 'Demo-lition', password: 'password' }))
    .then(closeModal)
  }

  return (
    <div className='loginPage'>
      <h1 className='loginH1'>Log In</h1>
      <form className='loginForm'>
        <div className='usernameLoginDiv'>
          <span className='usernameLoginSpan'>Username or Email:</span>
          <input
            className='usernameLoginInput'
            type="text"
            placeholder='username or email'
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </div>
        <div className='passwordLoginDiv'>
          <span className='passwordLoginSpan'>Password:</span>
          <input
            className='passwordLoginInput'
            type="password"
            placeholder='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {errors.credential && <p className='error'>{errors.credential}</p>}
        <button disabled={!credential || !password} onClick={handleLogin} type="submit" className='userLoginButton'>Log In</button>
      </form>
      <div className='demoUserLoginDiv'>
        <button onClick={handleDemoUser} className='demoUserLoginButton'>Login as Demo User</button>
      </div>
    </div>
  );
}

export default LoginForm;
