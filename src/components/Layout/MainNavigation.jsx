/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { isMobile } from 'react-device-detect';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { PAGES } from '../../pages/consts';
import { MainNavigationStyle } from './main-navigation-utils';
import hamburger from '../../images/menu-hamburger.svg';
import { updateMenuDisplay, updateLogoutState } from '../../Store/store';
import { fetchUserData } from '../../network';

const logo = require('../../images/fbh-logo.png');

function MainNavigation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userImg, setUserImg] = useState('');
  const [userName, setUserName] = useState('');
  const [userData, setUserData] = useState({});

  useEffect(() => fetchUserData({ setUserData, setUserName, setImageUrl: setUserImg }), []);
  const onHamburgerClicked = () => {
    dispatch(updateMenuDisplay(true));
  };
  const logoutHandler = () => {
    dispatch(updateLogoutState());
    fetchUserData({ setUserData, setUserName, setImageUrl: setUserImg });
    navigate(PAGES.LOGIN, { replace: true });
  };
  
  

  return (
    <MainNavigationStyle>
      <section className="site-info">
        <Link to={PAGES.HOME}><img src={logo} className="logo" alt="logo" /></Link>
      </section>
      <section className="user-usage">
        <img src={hamburger} className="hamburger" alt="menu-button" onClick={onHamburgerClicked} />
        {
            <>
              {!isMobile && (
                <LazyLoadImage
                  alt="side image"
                  effect="opacity"
                  src={userImg}
                  style={
                    {
                      objectFit: 'cover',
                      width: '45px',
                      height: '45px',
                      'border-radius': '40px',
                    }
                  }
                />
              )}
              <div>{userData.firstName ? `Welcome, ${userData.firstName}` : ''}</div>
              <Link to={PAGES.DASHBOARD}><div className="menu-item">Rent Items</div></Link>
              <Link to={PAGES.UPLOAD_OFFER}><div className="menu-item">Add Item</div></Link>
            </>
          }
      </section>
    </MainNavigationStyle>
  );
}

export default MainNavigation;
