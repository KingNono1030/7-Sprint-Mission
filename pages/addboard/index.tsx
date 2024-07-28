import { useEffect, useState, useCallback, useRef } from 'react';
import Head from 'next/head';
import { debounce } from 'lodash';
import axiosInstance from '@/lib/axios';
import CommonLayout from '@/layouts/CommonLayout';
import FileInput from '@/components/FileInput';
import Button from '@/components/Button';

interface Values {
  title: string;
  description: string;
  image: File | null;
}

const INITIAL_VALUES: Values = {
  title: '',
  description: '',
  image: null,
};

export default function AddBoardPage() {
  const [values, setValues] = useState<Values>(INITIAL_VALUES);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const descInputRef = useRef<HTMLTextAreaElement>(null);

  const isActive = !!(values.title && values.description);

  const debouncedInput = useCallback(
    debounce((name: string, value: string | File | null): void => {
      setValues(prev => ({ ...prev, [name]: value }));
    }, 300),
    []
  );

  const handleFileChange = (value: File | null) => {
    debouncedInput('image', value);
  };

  const handleChange = (name: string) => {
    return () => {
      let value = '';
      switch (name) {
        case 'title':
          value = titleInputRef.current?.value || '';
          break;
        case 'description':
          value = descInputRef.current?.value || '';
          break;
        default:
          break;
      }
      debouncedInput(name, value);
    };
  };

  const handleSubmit = () => {};

  return (
    <>
      <Head>
        <title>판다 마켓 | 게시글 등록</title>
      </Head>
      <CommonLayout>
        <form className="mb-10" id="addPostForm" onSubmit={}>
          <div className="mb-6 flex w-full items-center justify-between">
            <h2 className="text-xl font-bold">게시글 등록하기</h2>
            <Button type="submit" form="addPostForm" isActive={isActive}>
              등록
            </Button>
          </div>
          <label className="mb-4 block w-full">
            <h3 className="mb-3 text-sm font-bold">*제목</h3>
            <input
              onChange={handleChange('title')}
              className="block h-[56px] w-full rounded-xl bg-gray-100 px-6 py-4 placeholder-gray-400"
              name="title"
              type="text"
              placeholder="제목을 입력해주세요"
              required
              ref={titleInputRef}
            />
          </label>
          <label className="mb-4 block w-full">
            <h3 className="mb-3 text-sm font-bold">*내용</h3>
            <textarea
              onChange={handleChange('description')}
              className="block h-[56px] min-h-[200px] w-full resize-none rounded-xl bg-gray-100 px-6 py-4 placeholder-gray-400 md:min-h-[282px]"
              name="description"
              placeholder="내용을 입력해주세요"
              required
              ref={descInputRef}
            ></textarea>
          </label>
          <label className="mb-4 block w-full">
            <h3 className="mb-3 text-sm font-bold">이미지</h3>
            <FileInput onChange={handleFileChange} value={values.image} />
          </label>
        </form>
      </CommonLayout>
    </>
  );
}
