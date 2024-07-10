import { Link } from 'react-router-dom';
import Button from './Button';
import ProductSectionHeader from './ProductSectionHeader';
import ProductList from './ProductList';
import Dropdown from './Dropdown';

const HEADER_TEXT = '판매 중인 상품';

export default function AllProductSection({
  handleOrderClick,
  items,
  isLoading,
  order,
}) {
  return (
    <section className='max-w-[1200px] my-0 mx-auto p-4'>
      <ProductSectionHeader text={HEADER_TEXT}>
        <Link to='/additem' className='block h-[42px]'>
          <Button className=''>상품 등록하기</Button>
        </Link>
        <div className='relative h-[42px]'>
          <input
            className='w-80 h-full py-2 pl-11 rounded-xl bg-gray-100 font-normal text-base md:order-1'
            placeholder='검색할 상품을 입력해주세요'
          />
          <svg
            className='absolute left-4 top-[9px]'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M10.8966 16.2605C12.378 16.2605 13.6424 15.7401 14.6897 14.6992C15.7369 13.6584 16.2605 12.3908 16.2605 10.8966C16.2605 9.41507 15.7369 8.1507 14.6897 7.10345C13.6424 6.05619 12.378 5.53257 10.8966 5.53257C9.4023 5.53257 8.13474 6.05619 7.09387 7.10345C6.053 8.1507 5.53257 9.41507 5.53257 10.8966C5.53257 12.3908 6.053 13.6584 7.09387 14.6992C8.13474 15.7401 9.4023 16.2605 10.8966 16.2605ZM10.8966 17.7931C9.9387 17.7931 9.04151 17.6111 8.20498 17.2471C7.36845 16.8831 6.64049 16.3914 6.02107 15.772C5.40166 15.1526 4.90996 14.4246 4.54598 13.5881C4.18199 12.7516 4 11.8544 4 10.8966C4 9.95147 4.18199 9.06066 4.54598 8.22414C4.90996 7.38761 5.40166 6.65645 6.02107 6.03065C6.64049 5.40485 7.36845 4.90996 8.20498 4.54598C9.04151 4.18199 9.9387 4 10.8966 4C11.8416 4 12.7324 4.18199 13.569 4.54598C14.4055 4.90996 15.1367 5.40485 15.7625 6.03065C16.3883 6.65645 16.8831 7.38761 17.2471 8.22414C17.6111 9.06066 17.7931 9.95147 17.7931 10.8966C17.7931 11.7139 17.659 12.4866 17.3908 13.2146C17.1226 13.9425 16.7522 14.6066 16.2797 15.2069L18.7893 17.7165C18.9425 17.8697 19.016 18.0485 19.0096 18.2529C19.0032 18.4572 18.9234 18.636 18.7701 18.7893C18.6169 18.9298 18.4381 19 18.2337 19C18.0294 19 17.8506 18.9298 17.6973 18.7893L15.1877 16.2989C14.5875 16.7714 13.9234 17.1386 13.1954 17.4004C12.4674 17.6622 11.7011 17.7931 10.8966 17.7931Z'
              fill='#9CA3AF'
            />
          </svg>
        </div>
        <Dropdown>
          <Dropdown.Toggle>최신순</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item position='first'>최신순</Dropdown.Item>
            <Dropdown.Item position='last'>좋아요순</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </ProductSectionHeader>
      <ProductList
        className='grid gap-2 md:gap-4 xl:gap-6 grid-cols-2 md:grid-cols-3 xl:grid-cols-5'
        items={items}
      />
    </section>
  );
}
