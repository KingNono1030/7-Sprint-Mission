import { useEffect, useState, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getItemByID, getCommentsByID } from '@utils/api';
import useAsync from '@hooks/useAsync';
import ProductDescription from '@components/ProductDescription';
import ProductReviews from '@components/ProductReviews';
import Button from '@components/Button';
import { CommentType } from '@components/ProductReviews';

export default function ItemPage() {
  const { productId } = useParams<{ productId?: string }>();
  const [product, setProduct] = useState<{
    name: string;
    description: string;
    price: number;
    tags: string[];
    images: string[];
    favoriteCount: number;
  }>(INITIAL_PRODUCT);
  const [comments, setComments] = useState<CommentType[]>(INITIAL_COMMENTS);
  const [, itemLoadingError, getItemAsync] = useAsync(getItemByID);
  const [, commentsLoadingError, getCommentsAsync] = useAsync(getCommentsByID);

  const getValidItem = useCallback(
    async (productId: string) => {
      const result = await getItemAsync(productId);
      if (!result) return;
      return result;
    },
    [getItemAsync]
  );

  const loadItem = useCallback(
    async (options: string) => {
      const nextItems = await getValidItem(options);
      setProduct((prevItems) => nextItems);
    },
    [getValidItem]
  );

  const getValidComments = useCallback(
    async (productId: string): Promise<CommentType[]> => {
      const result = await getCommentsAsync(productId);
      if (!result) return [];
      const { list } = result;
      return Array.isArray(list) ? list : [];
    },
    [getCommentsAsync]
  );

  const loadcomments = useCallback(
    async (options: string) => {
      const nextItems = await getValidComments(options);
      setComments((prevItems) => [...nextItems]);
    },
    [getValidComments]
  );

  useEffect(() => {
    if (productId) {
      loadItem(productId);
    }
  }, [productId, loadItem]);

  useEffect(() => {
    if (productId) {
      loadcomments(productId);
    }
  }, [productId, loadcomments]);

  return (
    <div className='max-w-[1200px] mx-auto xl:px-0 p-4 pb-40'>
      <ProductDescription product={product} />
      {itemLoadingError && <span>{itemLoadingError.message}</span>}
      <ProductReviews comments={comments} />
      {commentsLoadingError && <span>{commentsLoadingError.message}</span>}
      <Link to='/items' className='flex justify-center'>
        <Button size='medium'>목록으로 돌아가기</Button>
      </Link>
    </div>
  );
}

const INITIAL_PRODUCT = {
  name: '',
  description: '',
  price: 0,
  tags: [],
  images: [],
  favoriteCount: 0,
};

const INITIAL_COMMENTS: CommentType[] = [];
