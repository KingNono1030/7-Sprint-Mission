import { useState, useEffect, useRef } from 'react';
import Icons from '@/components/Icons';
interface FileInputProps {
  onChange: (value: File | null) => void;
  value: File | null;
}

export default function FileInput({ onChange, value }: FileInputProps) {
  const imgInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string>('');

  const handleChange = () => {
    if (imgInputRef.current) {
      const nextValue = imgInputRef.current.files?.[0];
      if (nextValue === undefined) return;
      onChange(nextValue);
    }
  };
  const handleDelete = () => {
    onChange(null);
  };

  useEffect(() => {
    if (value) {
      const nextPreview = URL.createObjectURL(value);
      setPreview(() => nextPreview);
    } else {
      setPreview('');
    }
    return () => {
      URL.revokeObjectURL(preview);
      setPreview('');
    };
  }, [value]);

  return (
    <ul className="flex flex-wrap gap-2">
      <input
        name="image"
        className="hidden"
        id="fileinput"
        onChange={handleChange}
        type="file"
        ref={imgInputRef}
      />
      <label
        className="flex h-[168px] w-[168px] cursor-pointer flex-col items-center justify-between gap-3 rounded-xl bg-gray-100 py-[42px] text-gray-400"
        htmlFor="fileinput"
      >
        <Icons.Plus />
        이미지 등록
      </label>
      {preview && (
        <li className="shadow-custom-light relative">
          <img
            className="h-[168px] w-[168px] rounded-xl object-cover"
            src={preview}
            alt="이미지 미리보기"
          />
          <button
            className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-gray-400 text-xs font-black text-white"
            id={preview}
            type="button"
            onClick={handleDelete}
          >
            X
          </button>
        </li>
      )}
    </ul>
  );
}
