import {
  useState,
  createContext,
  useContext,
  ReactNode,
  MouseEventHandler,
} from 'react';
import clsx from 'clsx';

type Position = 'first' | 'last' | 'middle' | 'only';

interface CommonProperty {
  children: ReactNode;
  className?: string;
}

interface DropdownProperty extends CommonProperty {}
interface ToggleProperty extends CommonProperty {}
interface MenuProperty extends CommonProperty {}
interface ItemProperty extends CommonProperty {
  onClick?: MouseEventHandler<HTMLElement>;
  position: Position;
}

const DropdownContext = createContext({ isOpen: false, toggle: () => {} });

function Dropdown({ children = '', className = '' }: DropdownProperty) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const containerStyle = clsx(containerBaseStyle, className);

  return (
    <DropdownContext.Provider value={{ isOpen, toggle }}>
      <div className={containerStyle}>{children}</div>
    </DropdownContext.Provider>
  );
}

const Toggle = ({ children = '', className = '' }: ToggleProperty) => {
  const { toggle } = useContext(DropdownContext);
  const toggleStyle = clsx(toggleBaseStyle, className);

  return (
    <button className={toggleStyle} onClick={toggle} type='button'>
      {children}
    </button>
  );
};

const Menu = ({ children = '', className = '' }: MenuProperty) => {
  const { isOpen } = useContext(DropdownContext);
  const menuStyle = clsx(menuBaseStyle, className);

  return isOpen ? <div className={menuStyle}>{children}</div> : null;
};

const Item = ({
  children = '',
  className = '',
  onClick,
  position = 'middle',
}: ItemProperty) => {
  const itemPositionStyle = styleByPosition[position];
  const itemStyle = clsx(itemBaseStyle, itemPositionStyle, className);
  return (
    <div className={itemStyle} onClick={onClick}>
      {children}
    </div>
  );
};

const containerBaseStyle =
  'relative w-[130px] text-base font-normal text-gray-800';

const toggleBaseStyle =
  'flex justify-center items-center gap-6 w-full h-[42px] py-3 px-5 rounded-xl border border-solid border-gray-200 shadow-sm bg-white hover:bg-gray-50';

const menuBaseStyle =
  'absolute right-0 mt-2 w-full rounded-xl border border-solid border-gray-200 shadow-lg bg-white';

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
