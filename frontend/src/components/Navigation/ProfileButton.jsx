import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep click from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
        if (!ulRef.current.contains(e.target)) {
          setShowMenu(false);
        }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <div className='rightsideNav'>
      <button onClick={toggleMenu} className="profile-btn">
        <i className="fas fa-user-circle" />
      </button>
      <div className={ulClassName} ref={ulRef}> {/* <-- Attach it here */}
        <div>{user.username}</div>
        <div>{user.email}</div>
        <div className='dropdown-logout'>
          <button onClick={logout} className='dropdownBtn'>Log Out</button>
        </div>
      </div>
    </div>
  );
}

export default ProfileButton;
