import { useState, useEffect } from 'react';

export default function FileInput({ name, value = [], onChange }) {
  const [previews, setPreviews] = useState([]);

  const handleChange = (e) => {
    const nextValue = e.target.files[0];
    onChange(name, [...value, nextValue]);
  };

  const handleDelete = (e) => {
    const targetPreview = e.target.id;
    const targetIndex = previews.indexOf(targetPreview);
    onChange(name, [
      ...value.slice(0, targetIndex),
      ...value.slice(targetIndex + 1),
    ]);
  };

  useEffect(() => {
    const nextPreviews = value.map((item) => URL.createObjectURL(item));
    setPreviews((prevPreviews) => [...nextPreviews]);

    return () => {
      value.forEach((item) => URL.revokeObjectURL(item));
    };
  }, [value]);

  return (
    <>
      <input
        id='fileinput'
        onChange={handleChange}
        type='file'
        style={{ display: 'none' }}
      />
      <ul className='flex flex-wrap gap-2'>
        <label
          className='flex flex-col justify-between items-center gap-3 w-[168px] h-[168px] rounded-xl py-[42px] bg-gray-100 text-gray-400'
          htmlFor='fileinput'
        >
          <div className='text-5xl'>+</div>
          이미지 등록
        </label>
        {previews[0] &&
          previews.map((item) => {
            return (
              <li className='relative shadow-custom-light' key={item}>
                <img
                  className='w-[168px] h-[168px] rounded-xl object-cover'
                  src={item}
                  alt='이미지 미리보기'
                />
                <button
                  className='flex justify-center items-center absolute top-3 right-3 w-5 h-5 rounded-full bg-gray-400 font-black text-xs text-white'
                  id={item}
                  type='button'
                  onClick={handleDelete}
                >
                  X
                </button>
              </li>
            );
          })}
      </ul>
    </>
  );
}
