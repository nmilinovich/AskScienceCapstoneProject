import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import logo from '../../../public/favicon.ico'
import './Navigation.css'
function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  const sessionLinks = sessionUser ? (
    <div>
      
      <ProfileButton user={sessionUser} />
    </div>
  ) : (
    <div className='login-signup-div'>

      <NavLink to="/login"><button className='nav-Btn'>Login</button></NavLink>
        <NavLink to="/signup"><button className='nav-Btn'>Sign Up</button></NavLink>

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
            <button className='bioTag'>Biology</button>
            <button className='chemTag'>Chemistry</button>
            <button className='physTag'>Physics</button>
        </div>
        <div className='rightsideNav'>

            {isLoaded && sessionLinks}
        </div>
    </div>
  );
}

export default Navigation;
