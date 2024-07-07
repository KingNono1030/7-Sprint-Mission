import React from 'react';
import useDropdown from '../hooks/useDropdown';
import caretDownIcon from '../image-resource/ic-caret-down.svg';

const Dropdown = ({ label, items, className }) => {
  const { isOpen, toggle, ref } = useDropdown();

  return (
    <div
      className={`relative inline-block w-[130px] h-full text-left text-base font-normal text-gray-800 ${className}`}
      ref={ref}
    >
      <button
        type='button'
        className='flex justify-between items-center w-full h-full py-3 px-5 rounded-xl border border-solid border-gray-200 shadow-sm bg-white hover:bg-gray-50'
        onClick={toggle}
      >
        {label}
        <img src={caretDownIcon} alt='드롭다운 버튼 아이콘' />
      </button>

      {isOpen && (
        <div className='origin-top-right absolute right-0 mt-2 rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5'>
          <div className='py-1'>
            {items.map((item, index) => (
              <button
                id={item.label}
                key={item.label}
                className='w-full px-4 py-2 hover:bg-gray-100'
                onClick={() => {
                  item.onClick();
                  toggle();
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
