import { Link, useLocation } from 'react-router-dom';
import useMediaQuery from '../hooks/useMediaQuery';
import logoImgMobile from '../image-resource/panda-auth-logo--mobile.svg';
import logoImg from '../image-resource/panda-auth-logo.svg';
import googleLoginImg from '../image-resource/sns-login--google.svg';
import kakaoLoginImg from '../image-resource/sns-login--kakao.svg';

const LOGINPAGE_HEADER = '판다마켓이 처음이신가요?';
const SIGNUPPAGE_HEADER = '이미 회원이신가요?';

export default function AuthContainer({ className, children }) {
  const location = useLocation();
  const isLogin = location.pathname === '/login';
  const isSignup = location.pathname === '/signup';
  const [deviceType] = useMediaQuery();
  const isMobile = deviceType === 'Mobile';
  const logo = isMobile ? logoImgMobile : logoImg;
  return (
    <div className={`px-4 md:px-12 ${className}`}>
      <Link to='/'>
        <img
          className='mx-auto my-6 md:mt-12 md:mb-10 xl:mt-[60px]'
          src={logo}
          alt='판다마켓 로고'
        />
      </Link>
      {children}
      <SNSBox />
      <AuthLink isLogin={isLogin} isSignup={isSignup} />
    </div>
  );
}

function SNSBox() {
  return (
    <div className='flex justify-between items-center max-w-[640px] px-6 py-4 mx-auto mb-6 rounded-lg bg-blue-100'>
      <h3 className='text-base font-medium text-gray-800'>간편 로그인하기</h3>
      <ul className='flex gap-4'>
        <li>
          <Link to='https://www.google.com/'>
            <img src={googleLoginImg} alt='구글 간편 로그인' />
          </Link>
        </li>
        <li>
          <Link to='https://play.google.com/store/apps/details?id=com.kakao.talk&hl=ko'>
            <img src={kakaoLoginImg} alt='카카오 간편 로그인' />
          </Link>
        </li>
      </ul>
    </div>
  );
}

function AuthLink({ isLogin = false, isSignup = false }) {
  let headerText = '';
  let nextPage = '';
  let nextPagePath = '';
  if (isLogin) {
    headerText = LOGINPAGE_HEADER;
    nextPage = '회원가입';
    nextPagePath = '/signup';
  }
  if (isSignup) {
    headerText = SIGNUPPAGE_HEADER;
    nextPage = '로그인';
    nextPagePath = '/login';
  }

  return (
    <div className='text-center font-medium text-base text-gray-800'>
      <span>{headerText} </span>
      <Link to={nextPagePath} className='text-blue underline'>
        <span>{nextPage}</span>
      </Link>
    </div>
  );
}
