import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import './LoginForm.css'
function LoginFormPage() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  console.log(state)

  if (sessionUser) {
    return navigate('/')
  }

  const handleLogin = async (e) => {
    console.log(sessionActions)
    e.preventDefault();
    setErrors({});
    dispatch(sessionActions.login({ credential, password }))
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
    return dispatch(sessionActions.login({ credential: 'Demo-lition', password: 'password' }))
    .then(closeModal)
  }

  return (
    <div className='loginPage'>
      <h1 className='loginH1'>Log In</h1>
      <form className='loginForm'>
        <label>
            Username or Email
            <input
              type="text"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {errors.credential && <p>{errors.credential}</p>}
          <button onClick={handleLogin} type="submit">Log In</button>
      </form>
    </div>
  );
}

export default LoginFormPage;
