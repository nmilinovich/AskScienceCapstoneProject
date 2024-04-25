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
  console.log(errors)

  if (sessionUser) {
    if (state.prev?.pathname) {
      console.log(state.prev.pathname)
      navigate(state.prev.pathname)
    }
    return navigate('/')
  }
  const handleSubmit = (e) => {
    e.preventDefault();
      setErrors({});
      if (password === confirmPassword) {
        return dispatch(
          sessionActions.signup({
            email,
            username,
            password
        })).catch(async (res) => {
              const data = await res.json();
              setErrors(data.errors);
        }).then(navigate(state.prev.pathname || '/'))
      } else {
      setErrors({...errors, confirmPassword: 'passwords need to match'})
      }
  };

  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <span>{errors.email}</span>}
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        {errors.username && <span>{errors.username}</span>}
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <span>{errors.password}</span>}
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errors.confirmPassword && <span>{errors.confirmPassword}</span>}
        <button disabled={!email || !username || ! password || ! confirmPassword} type="submit">Sign Up</button>
      </form>
    </>
  );
}

export default SignupFormPage
