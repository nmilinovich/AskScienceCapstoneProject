import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import './SignupForm.css';

function SignupFormPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser) {
    if (state.prev?.pathname) {
      navigate(state.prev.pathname)
    }
    return navigate('/')
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
      setErrors({});
      if (password === confirmPassword) {
        await dispatch(
          sessionActions.signup({
            email,
            username,
            password
        })).catch(async (res) => {
              const data = await res.json();
              setErrors(data.errors);
        })
      } else {
          setErrors({...errors, confirmPassword: 'Passwords need to match'})
      }
  };

  return (
    <div className='signupPage'>
      <h1 className='signupH1'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='signupForm'>
        <div className='emailSignupDiv'>
          <span className='emailSignupSpan'>Email:</span>
          <input
            className='emailSignupInput'
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        {errors.email && <p className='error'>{errors.email}</p>}
        <div className='usernameSignupDiv'>
          <span className='usernameSignupSpan'>Username:</span>
          <input
            className='usernameSignupInput'
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        {errors.username && <p className='error'>{errors.username}</p>}
        <div className='passwordSignupDiv'>
          <span className='passwordSignupSpan'>Password:</span>
          <input
            className='passwordSignupInput'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {errors.password && <p className='error'>{errors.password}</p>}
        <div className='confirmPasswordSignupDiv'>
          <span className='confirmPasswordSignupSpan'>Confirm Password:</span>
          <input
            className='confirmPasswordSignupInput'
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            />
        </div>
        {errors.confirmPassword && <p className='error'>{errors.confirmPassword}</p>}
        <button disabled={!email || !username || ! password || ! confirmPassword}
          type="submit" className='userSignupButton'>Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignupFormPage
