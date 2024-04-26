import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModalButton from '../LoginFormModalButton';
import logo from '/src/favicon.ico'
import './Navigation.css'
function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const location = useLocation()
  const sessionLinks = sessionUser ? (
    <div className='login-signup-div'>
      <ProfileButton user={sessionUser} />
    </div>
  ) : (
    <div className='login-signup-div'>
        <LoginFormModalButton />
        {/* <NavLink className='loginNavLink' to="/login" state={{ prev: location }} ><button className='navBtnLogin'>Login</button></NavLink> */}
        <NavLink className='signupNavLink' to="/signup" state={{ prev: location }}><button className='navBtnSignup'>Sign Up</button></NavLink>
    </div>
  );

  return (
    <div className='navbar'>
        <div className='leftsideNav'>
            <NavLink to="/" className='homeBtn'>
              <img className='logo' src={logo} alt=''/>
            </NavLink>
        </div>
        <div className='filterTags'>
            <button onClick={() => alert('feature coming soon')} className='bioTag'>Biology</button>
            <button onClick={() => alert('feature coming soon')} className='chemTag'>Chemistry</button>
            <button onClick={() => alert('feature coming soon')} className='physTag'>Physics</button>
        </div>
        {isLoaded && sessionLinks}
    </div>
  );
}

export default Navigation;
