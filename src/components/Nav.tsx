import { Link, useLocation } from 'react-router-dom';
import Button from '@components/Button';
import useMediaQuery from '@hooks/useMediaQuery';
import logoImgMobile from '@assets/panda-logo-mobile.svg';
import logoImg from '@assets/panda-logo.svg';

export default function Nav() {
  const location = useLocation();
  const [deviceType] = useMediaQuery();

  const isCommunity = location.pathname === '/community';
  const isItems =
    location.pathname === '/items' || location.pathname === '/additem';
  const isLogin = location.pathname === '/login';
  const isSignup = location.pathname === '/signup';
  if (isLogin || isSignup) return;

  const isMobile = deviceType === 'Mobile';
  const responsiveLogoImg = isMobile ? logoImgMobile : logoImg;

  const communityStyle = isCommunity ? 'text-blue' : 'text-gray-600';
  const itemsStyle = isItems ? 'text-blue' : 'text-gray-600';

  return (
    <nav className={navStyle}>
      <Link to='/'>
        <img src={responsiveLogoImg} alt='판다마켓 로고' />
      </Link>
      <ul className={listStyle}>
        <Link to='/community'>
          <li className={communityStyle}>자유게시판</li>
        </Link>
        <Link to='/items'>
          <li className={itemsStyle}>중고마켓</li>
        </Link>
      </ul>
      <Link to='/login'>
        <Button>로그인</Button>
      </Link>
    </nav>
  );
}

const navStyle =
  'flex justify-between items-center gap-x-4 sticky top-0 h-[70px] px-4 border-b border-solid border-gray-200 bg-white z-10';
const listStyle =
  'flex items-center gap-x-2 flex-grow font-bold text-base font-primary';
