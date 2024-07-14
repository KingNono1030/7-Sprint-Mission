import { useState, KeyboardEvent } from 'react';
import LabelInput from '@components/LabelInput';

interface TagInputProps {
  name: string;
  value: string[];
  onChange: (name: string, value: string[]) => void;
}

export default function TagInput({
  name,
  value = [],
  onChange,
}: TagInputProps) {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const target = e.target as HTMLInputElement;
      const nextValue = target.value.trim().split(' ');
      const distinctNextValue = [...new Set([...value, ...nextValue])];
      onChange(name, distinctNextValue);
      setInputValue('');
      e.preventDefault();
    }
  };

  const handleDelete = (itemToDelete: string) => {
    const updatedValue = value.filter((item) => item !== itemToDelete);
    onChange(name, updatedValue);
  };

  return (
    <>
      <LabelInput
        name='tag'
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder='태그를 입력해주세요'
      />
      {value.length > 0 && (
        <ul className='flex flex-wrap gap-3 mt-3'>
          {value.map((item) => (
            <Tag item={item} handleDelete={handleDelete} />
          ))}
        </ul>
      )}
    </>
  );
}

interface TagProps {
  item: string;
  handleDelete: (itemToDelete: string) => void;
}

function Tag({ item, handleDelete }: TagProps) {
  return (
    <li
      className='flex justify-between items-center gap-2 p-3 pl-4 rounded-[26px] bg-gray-50'
      key={item}
    >
      <span className='font-normal text-4 text-gray-800'>{item}</span>
      <button
        className='flex justify-center items-center w-5 h-5 rounded-full bg-gray-400 font-black text-xs text-white'
        onClick={() => handleDelete(item)}
        type='button'
      >
        X
      </button>
    </li>
  );
}
