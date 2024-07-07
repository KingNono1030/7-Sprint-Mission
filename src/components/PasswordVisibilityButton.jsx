import visibilityOnImg from '../image-resource/btn-visibility-on.svg';
import visibilityOffImg from '../image-resource/btn-visibility-off.svg';

const visibility = {
  on: visibilityOnImg,
  off: visibilityOffImg,
};

export default function PasswordVisibilityButton({ onClick, show }) {
  const visibilityImg = show ? visibility.on : visibility.off;
  return (
    <img
      className='absolute bottom-6 right-6'
      src={visibilityImg}
      alt='비밀번호 보기/가리기'
      onClick={onClick}
    />
  );
}
