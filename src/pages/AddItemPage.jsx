import { useState } from 'react';
import { Helmet } from 'react-helmet';
import Button from '../components/Button';
import FileInput from '../components/FileInput';
import TagInput from '../components/TagInput';

const INITIAL_VALUE = {
  images: [],
  name: '',
  description: '',
  price: '',
  tags: [],
};

export default function AddItemPage() {
  const [values, setValues] = useState(INITIAL_VALUE);
  const isActive =
    values.name && values.description && values.price && values.tags.length;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const handleChange = (name, value) => {
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const hanleSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append('images');
  };

  const handlePriceChange = (e) => {
    const numberValue = parseFloat(e.target.value.replace(/[^\d.]/g, ''));
    let formattedValue = '';
    if (!isNaN(numberValue)) {
      formattedValue = numberValue.toLocaleString('ko-KR', {
        style: 'currency',
        currency: 'KRW',
      });
    }
    handleChange('price', formattedValue);
  };

  return (
    <>
      <Helmet>
        <title>상품 등록</title>
      </Helmet>
      <form
        className='flex flex-col items-center gap-4 max-w-[1200px] p-4 m-auto mb-10'
        id='addItemForm'
      >
        <div className='flex justify-between items-center w-full'>
          <h2 className='font-bold text-xl'>상품 등록하기</h2>
          <Button
            type='submit'
            form='addItemForm'
            onSubmit={hanleSubmit}
            isActive={isActive}
          >
            등록
          </Button>
        </div>
        <label className='w-full'>
          <h3 className='font-bold text-sm mb-3'>상품 이미지</h3>
          <FileInput
            onChange={handleChange}
            name='images'
            value={values.images}
          />
        </label>
        <label className='w-full'>
          <h3 className='font-bold text-sm mb-3'>상품명</h3>
          <input
            className='block w-full h-[56px] py-4 px-6 rounded-xl bg-gray-100 placeholder-gray-400'
            name='name'
            value={values.name}
            onChange={handleInputChange}
            type='text'
            placeholder='상품명을 입력해주세요'
            required
          />
        </label>
        <label className='w-full'>
          <h3 className='font-bold text-sm mb-3'>상품 소개</h3>
          <textarea
            className='block w-full h-[56px] min-h-[200px] py-4 px-6 rounded-xl bg-gray-100 placeholder-gray-400 resize-none'
            name='description'
            value={values.description}
            onChange={handleInputChange}
            type='text'
            placeholder='상품 소개를 입력해주세요'
            required
          ></textarea>
        </label>
        <label className='w-full'>
          <h3 className='font-bold text-sm mb-3'>판매가격</h3>
          <input
            className='block w-full h-[56px] py-4 px-6 rounded-xl bg-gray-100 placeholder-gray-400'
            name='price'
            value={values.price}
            onChange={handlePriceChange}
            type='text'
            placeholder='판매 가격을 입력해주세요'
            required
          />
        </label>
        <label className='w-full'>
          <h3 className='font-bold text-sm mb-3'>태그</h3>
          <TagInput name='tags' value={values.tags} onChange={handleChange} />
        </label>
      </form>
    </>
  );
}
