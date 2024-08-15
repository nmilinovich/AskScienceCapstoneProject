import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import * as sessionActions from '../../store/session';
import { FaUserCircle } from 'react-icons/fa';

function ProfileButton({ user }) {
  const navigate = useNavigate()
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
    // window.location.reload()
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <div className='rightsideNav'>
      <div onClick={() => navigate('/questions/new')} className='askQuestionButton'>
        Ask a Question
      </div>
      <div onClick={toggleMenu} className="profile-btn">
        <FaUserCircle size={24}/>
      </div>
      <div className={ulClassName} ref={ulRef}> {/* <-- Attach it here */}
        <div>{user.username}</div>
        <div>{user.email}</div>
        <div className='dropdown-logout'>
          <div onClick={logout} className='dropdownBtn'>Log Out</div>
        </div>
      </div>
    </div>
  );
}

export default ProfileButton;
