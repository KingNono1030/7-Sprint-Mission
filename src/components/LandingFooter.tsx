import { Link } from 'react-router-dom';
import facebookImg from '@assets/ic-facebook.svg';
import twitterImg from '@assets/ic-twitter.svg';
import instagramImg from '@assets/ic-instagram.svg';
import youtubeImg from '@assets/ic-youtube.svg';

export default function LandingFooter() {
  return (
    <footer className={containerStyle}>
      <Copyright />
      <Info />
      <ContactList />
    </footer>
  );
}

function Copyright() {
  return <span className={copyrightStyle}>©codeit - 2024</span>;
}

function Info() {
  return (
    <ul className={infoStyle}>
      <li>
        <Link to='/privacy'>Privacy Policy</Link>
      </li>
      <li>
        <Link to='/faq'>FAQ</Link>
      </li>
    </ul>
  );
}

function ContactList() {
  return (
    <ul className={contactStyle}>
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

const containerStyle =
  'grid grid-cols-2 md:grid-cols-3 gap-16 h-40 p-8 md:px-[100px] xl:px-[200px] bg-gray-900';
const copyrightStyle = 'order-1 font-normal text-base text-gray-300';
const infoStyle =
  'md:order-2 flex md:justify-center gap-7 font-normal text-base text-gray-100';
const contactStyle = 'md:order-3 flex justify-end gap-3 ';
