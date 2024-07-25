import { useState, useEffect, ChangeEvent, MouseEvent } from 'react';

interface FileInputProps {
  name: string;
  value: File[];
  onChange: (name: string, value: File[]) => void;
}

export default function FileInput({
  name,
  value = [],
  onChange,
}: FileInputProps) {
  const [previews, setPreviews] = useState<string[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (target.files) {
      const nextValue = target.files[0];
      onChange(name, [...value, nextValue]);
    }
  };

  const handleDelete = (e: MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    const targetPreview = target.id;
    const targetIndex = previews.indexOf(targetPreview);
    onChange(name, [
      ...value.slice(0, targetIndex),
      ...value.slice(targetIndex + 1),
    ]);
  };

  useEffect(() => {
    const nextPreviews = value.map(item => URL.createObjectURL(item));
    setPreviews(prevPreviews => [...nextPreviews]);

    return () => {
      nextPreviews.forEach(preview => URL.revokeObjectURL(preview));
    };
  }, [value]);

  return (
    <>
      <input
        id="fileinput"
        onChange={handleChange}
        type="file"
        style={{ display: 'none' }}
      />
      <ul className="flex flex-wrap gap-2">
        <label
          className="flex h-[168px] w-[168px] flex-col items-center justify-between gap-3 rounded-xl bg-gray-100 py-[42px] text-gray-400"
          htmlFor="fileinput"
        >
          <div className="text-5xl">+</div>
          이미지 등록
        </label>
        {previews[0] &&
          previews.map(item => {
            return (
              <li className="shadow-custom-light relative" key={item}>
                <img
                  className="h-[168px] w-[168px] rounded-xl object-cover"
                  src={item}
                  alt="이미지 미리보기"
                />
                <button
                  className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-gray-400 text-xs font-black text-white"
                  id={item}
                  type="button"
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
