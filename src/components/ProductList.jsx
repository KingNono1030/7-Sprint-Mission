import { Link } from 'react-router-dom';
import heartImg from '../image-resource/panda-product-favorite-count.svg';

export default function ProductList({ className, items }) {
  return (
    <ul className={className}>
      {items.map((item) => (
        <li key={item.id}>
          <Link to={`/items/${item.id}`} className='flex flex-col h-full'>
            <ProductListItem item={item} />
          </Link>
        </li>
      ))}
    </ul>
  );
}

function ProductListItem({ item }) {
  const { images, price, favoriteCount, name } = item;
  const formattedPrice = price.toLocaleString('ko-KR');

  return (
    <>
      <img
        className='w-full h-full my-4 rounded-2xl shadow-custom-light'
        src={images}
        alt={name}
      />
      <h4 className='my-[6px] font-medium text-sm text-gray-800'>{name}</h4>
      <span className='my-[6px] font-bold text-base text-gray-800'>
        {formattedPrice}원
      </span>
      <span className='flex items-center gap-1 font-medium text-xs text-gray-600'>
        <img className='heart-symbol' src={heartImg} alt='하트' />
        {favoriteCount}
      </span>
    </>
  );
}
