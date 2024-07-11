import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useMediaQuery from '@hooks/useMediaQuery';
import logoImgMobile from '@assets/panda-auth-logo--mobile.svg';
import logoImg from '@assets/panda-auth-logo.svg';
import googleLoginImg from '@assets/sns-login--google.svg';
import kakaoLoginImg from '@assets/sns-login--kakao.svg';

interface AuthContainerProps {
  children: ReactNode;
}

export default function AuthContainer({ children }: AuthContainerProps) {
  const location = useLocation();
  const isLogin = location.pathname === '/login';
  const currentPage = isLogin ? 'login' : 'signup';
  const [deviceType] = useMediaQuery();
  const isMobile = deviceType === 'Mobile';
  const logo = isMobile ? logoImgMobile : logoImg;
  return (
    <div className={containerStyle}>
      <Link to='/'>
        <img className={logoStyle} src={logo} alt='판다마켓 로고' />
      </Link>
      {children}
      <SNSBox />
      <AuthLink page={currentPage} />
    </div>
  );
}

function SNSBox() {
  return (
    <div className={SNSContainerStyle}>
      <h3 className={SNSHeaderStyle}>간편 로그인하기</h3>
      <ul className={SNSListStyle}>
        {SNSList.map((s) => (
          <li key={s.id}>
            <Link to={s.link}>
              <img src={s.img} alt={s.alt} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

interface AuthLinkProps {
  page: 'login' | 'signup';
}

function AuthLink({ page = 'login' }: AuthLinkProps) {
  const { headerText, nextPage, nextPagePath } = pageConfig[page];

  return (
    <div className={linkHeaderStyle}>
      <span>{headerText} </span>
      <Link to={nextPagePath} className={LinkStyle}>
        <span>{nextPage}</span>
      </Link>
    </div>
  );
}

const SNSList = [
  {
    id: 'google',
    link: 'https://www.google.com/',
    img: googleLoginImg,
    alt: '구글 간편 로그인',
  },
  {
    id: 'kakao',
    link: 'https://play.google.com/store/apps/details?id=com.kakao.talk&hl=ko',
    img: kakaoLoginImg,
    alt: '카카오 간편 로그인',
  },
];

const containerStyle = `px-4 md:px-12`;
const logoStyle = 'mx-auto my-6 md:mt-12 md:mb-10 xl:mt-[60px]';
const SNSContainerStyle =
  'flex justify-between items-center max-w-[640px] px-6 py-4 mx-auto mb-6 rounded-lg bg-blue-100';
const SNSHeaderStyle = 'text-base font-medium text-gray-800';
const SNSListStyle = 'flex gap-4';
const linkHeaderStyle = 'text-center font-medium text-base text-gray-800';
const LinkStyle = 'text-blue underline';

const pageConfig = {
  login: {
    headerText: '판다마켓이 처음이신가요?',
    nextPage: '회원가입',
    nextPagePath: '/signup',
  },
  signup: {
    headerText: '이미 회원이신가요?',
    nextPage: '로그인',
    nextPagePath: '/login',
  },
};
