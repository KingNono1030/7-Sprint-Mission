import { Link } from 'react-router-dom';
import facebookImg from '../image-resource/ic-facebook.svg';
import twitterImg from '../image-resource/ic-twitter.svg';
import instagramImg from '../image-resource/ic-instagram.svg';
import youtubeImg from '../image-resource/ic-youtube.svg';

export default function LandingFooter({
  src = '',
  headerF = '',
  headerS = '',
  isTop = false,
}) {
  return (
    <footer className='grid grid-cols-2 md:grid-cols-3 gap-16 h-40 p-8 md:px-[100px] xl:px-[200px] bg-gray-900'>
      <Copyright />
      <Info />
      <ContactList />
    </footer>
  );
}

function Copyright() {
  return (
    <span className='order-1 font-normal text-base text-gray-300'>
      ©codeit - 2024
    </span>
  );
}

function Info() {
  return (
    <ul className='md:order-2 flex md:justify-center gap-7 font-normal text-base'>
      <Link to='/privacy'>
        <li className='text-gray-100'>Privacy Policy</li>
      </Link>
      <Link to='/faq'>
        <li className='text-gray-100'>FAQ</li>
      </Link>
    </ul>
  );
}

function ContactList() {
  return (
    <ul className='md:order-3 flex justify-end gap-3 '>
      <li>
        <Link to='https://www.facebook.com/'>
          <img src={facebookImg} alt='페이스북 링크' />
        </Link>
      </li>
      <li>
        <Link to='https://x.com/'>
          <img src={twitterImg} alt='트위터 링크' />
        </Link>
      </li>
      <li>
        <Link to='https://www.youtube.com/'>
          <img src={youtubeImg} alt='유튜브 링크' />
        </Link>
      </li>
      <li>
        <Link to='https://www.instagram.com/'>
          <img src={instagramImg} alt='인스타그램 링크' />
        </Link>
      </li>
    </ul>
  );
}
