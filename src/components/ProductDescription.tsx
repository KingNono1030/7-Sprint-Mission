import heartIcon from '@assets/ic-heart.svg';
import kebabIcon from '@assets/ic-kebab.svg';

interface Product {
  favoriteCount: number;
  images: string[];
  tags: string[];
  name: string;
  description: string;
  price: number;
}

interface ProductDescriptionProps {
  product: Product;
}

export default function ProductDescription({
  product,
}: ProductDescriptionProps) {
  const { favoriteCount, images, tags, name, description, price } = product;
  const formattedPrice = new Intl.NumberFormat('ko-KR').format(price);

  return (
    <div className='grid md:grid-cols-custom-layout gap-4 xl:gap-6 mb-6 xl:mb-8'>
      <img
        className='w-full md:max-w-[340px] xl:max-w-[480px] mb-4 md:mb-0 rounded-xl shadow-xl'
        src={images[0]}
        alt='상품 사진'
      />
      <div className='relative'>
        <div className='relative'>
          <h2 className='mb-2 md:mb-3 xl:mb-4 font-semibold text-gray-800 text-base'>
            {name}
          </h2>
          <h3 className='mb-4 font-semibold text-gray-800 text-2xl'>
            {formattedPrice}원
          </h3>
          <img
            className='absolute top-0 right-0'
            src={kebabIcon}
            alt='수정하기'
          />
        </div>
        <div className='pt-4 border-t border-solid border-gray-200 '>
          <h3 className='mb-2 font-medium text-sm text-gray-600'>상품 소개</h3>
          <p className='mb-6 font-normal text-base text-gray-600'>
            {description}
          </p>
          <h3 className='mb-2 md:mb-3 font-medium text-sm text-gray-600'>
            상품 태그
          </h3>
          <ul className='flex gap-2 mb-6'>
            {tags.map((item, index) => {
              return (
                <li
                  className='px-4 py-[6px] rounded-full bg-gray-100'
                  key={index}
                >
                  #{item}
                </li>
              );
            })}
          </ul>
          <h3 className='xl:absolute xl:bottom-0 xl:left-0 flex gap-1 justify-center items-center w-20 px-3 py-1 border border-solid border-gray-200 rounded-full font-medium text-base text-gray-500'>
            <img src={heartIcon} alt='하트 아이콘' />
            {favoriteCount}
          </h3>
        </div>
      </div>
    </div>
  );
}
