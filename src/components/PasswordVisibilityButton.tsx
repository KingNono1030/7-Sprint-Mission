import visibilityOnImg from '@assets/btn-visibility-on.svg';
import visibilityOffImg from '@assets/btn-visibility-off.svg';

interface PasswordVisibilityButtonProps {
  onClick: () => void;
  show: Boolean;
}

export default function PasswordVisibilityButton({
  onClick,
  show,
}: PasswordVisibilityButtonProps) {
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

const visibility = {
  on: visibilityOnImg,
  off: visibilityOffImg,
};