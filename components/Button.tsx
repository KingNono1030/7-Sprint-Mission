import { ReactNode, MouseEventHandler } from 'react';
import clsx from 'clsx';

type Size = 'large' | 'medium' | 'small';
type Color = 'primary' | 'secondary';

interface ButtonProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  type?: 'button' | 'submit';
  isActive?: boolean;
  size?: Size;
  color?: Color;
  form?: string;
}

export default function Button({
  children = '',
  onClick,
  className = '',
  type = 'button',
  isActive = true,
  size = 'small',
  color = 'primary',
  form,
}: ButtonProps) {
  const buttonSizeStyle = styleBySize[size];
  const buttonColorStyle = styleByColor[color];
  const buttonStyle = clsx(
    buttonBaseStyle,
    buttonSizeStyle,
    buttonColorStyle,
    className
  );
  return (
    <button
      className={buttonStyle}
      type={type}
      onClick={onClick}
      disabled={!isActive}
      form={form}
    >
      {children}
    </button>
  );
}

const buttonBaseStyle: string = `flex justify-center items-center gap-2  disabled:bg-gray-400  font-semibold`;

const styleBySize: Record<Size, string> = {
  large: 'px-[128px] h-[56px] text-xl rounded-full',
  medium: 'w-[240px] h-[48px] text-lg rounded-full',
  small: 'px-6 h-[42px] text-base rounded-lg',
};

const styleByColor: Record<Color, string> = {
  primary: 'bg-blue-primary hover:bg-blue-600 text-white',
  secondary: 'bg-white text-blue border border-solid border-blue',
};
