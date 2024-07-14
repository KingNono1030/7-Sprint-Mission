import { ChangeEvent, FormEvent, useState } from 'react';
import getTimeAgo from '@utils/getTimeAgo';
import Button from '@components/Button';
import emptyInquiryImg from '@assets/img-inquiry-empty.svg';
import kebabIcon from '@assets/ic-kebab.svg';

export interface CommentType {
  id: string;
  content: string;
  createdAt: Date;
  writer: {
    id: string;
    nickname: string;
    image: string;
  };
}

interface ProductReviewsProps {
  comments: CommentType[];
}

export default function ProductReviews({ comments }: ProductReviewsProps) {
  const isInquiryEmpty = comments.length === 0;

  const getInquiry = () => {
    return isInquiryEmpty ? (
      <EmptyInquiry />
    ) : (
      <ul className='mb-6'>
        {comments.map((item) => {
          return (
            <li
              key={item.id}
              className='relative mt-6 border-b border-solid border-gray-200'
            >
              <Comment comment={item} />
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className='pt-4 border-t border-solid border-gray-200'>
      <ReviewsInput />
      {getInquiry()}
    </div>
  );
}

function ReviewsInput() {
  const [value, setValue] = useState('');
  const isActive = !!value.length;
  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;
    const nextValue = target.value;
    setValue((prevValue) => nextValue);
  };

  const hanleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={hanleSubmit}>
      <label>
        <h3 className='mb-4 text-base font-semibold text-gray-900'>문의하기</h3>
        <textarea
          onChange={handleInputChange}
          value={value}
          name='productReviews'
          placeholder={PLACEHOLDER}
          className='w-full h-[104px] px-6 py-4 mb-4 rounded-xl bg-gray-100 text-sm font-normal placeholder-gray-400 resize-none'
          required
        />
      </label>
      <Button className='ml-auto' isActive={isActive}>
        등록
      </Button>
    </form>
  );
}

function EmptyInquiry() {
  return (
    <div className='text-center mb-6'>
      <img className='mx-auto' src={emptyInquiryImg} alt='문의가 없습니다' />
      <h3 className='font-normal text-base text-gray-400'>
        아직 문의가 없습니다.
      </h3>
    </div>
  );
}

interface CommentProps {
  comment: CommentType;
}

function Comment({ comment }: CommentProps) {
  const {
    content,
    createdAt,
    writer: { nickname, image },
  } = comment;
  const hourGap = getTimeAgo(createdAt);

  return (
    <>
      <h3 className='font-normal text-base text-gray-800'>{content}</h3>
      <div className='flex gap-2 my-6'>
        <img className='w-10' src={image} alt='작성자 프로필' />
        <div className='flex flex-col gap-1'>
          <span className='font-normal text-sm text-gray-600'>{nickname}</span>
          <span className='font-normal text-xs text-gray-400'>
            {hourGap}시간 전
          </span>
        </div>
      </div>
      <img
        className='absolute top-0 right-0 cursor-pointer'
        src={kebabIcon}
        alt='케밥 이이콘'
      />
    </>
  );
}

const PLACEHOLDER =
  '개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다.';
