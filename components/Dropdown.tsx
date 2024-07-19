import { useState, createContext, useContext, ReactNode } from 'react';
import clsx from 'clsx';

type Position = 'first' | 'last' | 'middle' | 'only';

interface Props {
  children?: ReactNode;
  className?: string;
}

interface DropdownProps extends Props {}
interface ToggleProps extends Props {}
interface MenuProps extends Props {}
interface ItemProps extends Props {
  onClick: () => void;
  position: Position;
}

const DropdownContext = createContext({ isOpen: false, toggle: () => {} });

function Dropdown({ children = '', className = '' }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const containerStyle = clsx(containerBaseStyle, className);

  return (
    <DropdownContext.Provider value={{ isOpen, toggle }}>
      <div className={containerStyle}>{children}</div>
    </DropdownContext.Provider>
  );
}

const Toggle = ({ children = '', className = '' }: ToggleProps) => {
  const { toggle } = useContext(DropdownContext);
  const toggleStyle = clsx(toggleBaseStyle, className);

  return (
    <button className={toggleStyle} onClick={toggle} type="button">
      {children}
    </button>
  );
};

const Menu = ({ children = '', className = '' }: MenuProps) => {
  const { isOpen } = useContext(DropdownContext);
  const menuStyle = clsx(menuBaseStyle, className);

  return isOpen ? <div className={menuStyle}>{children}</div> : null;
};

const Item = ({
  children = '',
  className = '',
  onClick,
  position = 'middle',
}: ItemProps) => {
  const { toggle } = useContext(DropdownContext);

  const itemPositionStyle = styleByPosition[position];
  const itemStyle = clsx(itemBaseStyle, itemPositionStyle, className);
  return (
    <div
      className={itemStyle}
      onClick={() => {
        onClick();
        toggle();
      }}
    >
      {children}
    </div>
  );
};

const containerBaseStyle =
  'relative w-[42px] md:w-[130px] text-base font-normal text-gray-800';

const toggleBaseStyle =
  'flex justify-center md:justify-between items-center md:w-full w-[42px] h-[42px] md:py-3 md:px-5 rounded-xl border border-solid border-gray-200 shadow-sm bg-white hover:bg-gray-50';

const menuBaseStyle =
  'absolute right-0 mt-2 w-[130px] rounded-xl border border-solid border-gray-200 shadow-lg bg-white z-10';

const itemBaseStyle =
  'flex justify-center items-center px-4 py-2 hover:bg-gray-100 cursor-pointer';

const styleByPosition = {
  first: 'rounded-t-xl border-b border-solid border-gray-200',
  last: 'rounded-b-xl',
  middle: 'border-b border-solid border-gray-200',
  only: 'rounded-xl',
};

Dropdown.Toggle = Toggle;
Dropdown.Menu = Menu;
Dropdown.Item = Item;

export default Dropdown;
