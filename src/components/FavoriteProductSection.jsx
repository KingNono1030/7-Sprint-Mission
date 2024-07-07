import ProductSectionHeader from './ProductSectionHeader';
import ProductList from './ProductList';

const HEADER_TEXT = '베스트 상품';

export default function FavoriteProductSection({ items }) {
  return (
    <section className='max-w-[1200px] my-0 mx-auto p-4'>
      <ProductSectionHeader text={HEADER_TEXT} />
      <ProductList
        className='grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4'
        items={items}
      />
    </section>
  );
}
