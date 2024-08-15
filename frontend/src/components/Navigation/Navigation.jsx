import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import logo from '../../../public/favicon.ico'
import './Navigation.css'
import { FaBugs } from 'react-icons/fa6';
import { FaFlask, FaSpaceShuttle } from 'react-icons/fa';
import { IoTelescope } from 'react-icons/io5';
function Navigation({ isLoaded }) {
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
            <div onClick={() => alert('feature coming soon')} className='navTag bioTag'>
              <FaBugs/>
              Biology
            </div>
            <div onClick={() => alert('feature coming soon')} className='navTag chemTag'>
              <FaFlask/>
              Chemistry
            </div>
            <div onClick={() => alert('feature coming soon')} className='navTag physTag'>
              <IoTelescope/>
              Physics
            </div>
        </div>
        {isLoaded && sessionLinks}
    </div>
  );
}

export default Navigation;
