import { useEffect, useState, useCallback, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { debounce } from 'lodash';
import axiosInstance from '@/lib/axios';
import formatDate from '@/lib/formatDate';
import CommonLayout from '@/layouts/CommonLayout';
import BoardsLayout from '@/layouts/BoardsLayout';
import Dropdown from '@/components/Dropdown';
import Icons from '@/components/Icons';
import profileImg from '@/public/profile.svg';

interface Post {
  id: number;
  title: string;
  content: string;
  image: string | null;
  likeCount: number;
  createdAt: string;
  updatedAt: string;
  writer: {
    id: number;
    nickname: string;
  };
}

interface BoardsPageProps {
  bestPosts: Post[];
  posts: Post[];
}

interface PostsProps {
  posts: Post[];
}

export async function getStaticProps() {
  try {
    const bestRes = await axiosInstance.get(
      'articles?page=1&pageSize=3&orderBy=like'
    );
    const allRes = await axiosInstance.get(
      'articles?page=1&pageSize=10&orderBy=recent'
    );
    const bestPosts = bestRes.data.list || [];
    const posts = allRes.data.list || [];
    return {
      props: {
        bestPosts,
        posts,
      },
    };
  } catch (error) {
    return {
      props: {
        bestPosts: [],
        allPosts: [],
      },
    };
  }
}

type sortOrder = 'recent' | 'like';

interface Options {
  page: number;
  pageSize: number;
  order: sortOrder;
  keyword: string;
}

export default function BoardsPage({
  bestPosts,
  posts: allPosts,
}: BoardsPageProps) {
  const [posts, setPosts] = useState<Post[]>(allPosts);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [order, setOrder] = useState<sortOrder>('recent');
  const [keyword, setKeyword] = useState('');

  const inputRef = useRef(null);

  const loadPosts = async ({ page, pageSize, order, keyword }: Options) => {
    const res = await axiosInstance.get(
      `articles?page=${page}&pageSize=${pageSize}&orderBy=${order}&keyword=${keyword}`
    );
    const nextPosts = res.data.list || [];
    setPosts([...nextPosts]);
  };

  const handleOrder = (nextOrder: Options['order']) => {
    setOrder(() => nextOrder);
  };

  const debouncedSearch = useCallback(
    debounce((value: string): void => {
      setKeyword(() => value);
    }, 300),
    []
  );

  const handleChange = () => {
    if (inputRef.current) {
      const target = inputRef.current as HTMLInputElement;
      const nextKeyword = target.value;
      debouncedSearch(nextKeyword);
    }
  };

  useEffect(() => {
    loadPosts({ page, pageSize, order, keyword });
  }, [page, pageSize, order, keyword]);

  return (
    <>
      <Head>
        <title>판다 마켓 | 자유게시판</title>
      </Head>
      <CommonLayout>
        <BoardsLayout>
          <BestPosts posts={bestPosts} />
          <AllPosts posts={posts} />
          <input
            ref={inputRef}
            onChange={handleChange}
            className="h-full w-full rounded-xl bg-gray-100 pl-11 text-base font-normal"
            placeholder="검색할 게시글을 입력해주세요"
          />
          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() => {
                handleOrder('recent');
                console.log(order);
              }}
              position="first"
            >
              최신순
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                handleOrder('like');
                console.log(order);
              }}
              position="last"
            >
              좋아요순
            </Dropdown.Item>
          </Dropdown.Menu>
        </BoardsLayout>
      </CommonLayout>
    </>
  );
}

function BestPosts({ posts }: PostsProps) {
  return (
    <ul className="grid max-h-[200px] grid-cols-1 gap-4 overflow-hidden md:grid-cols-2 xl:grid-cols-3 xl:gap-6">
      {posts.map(post => (
        <li key={post.id}>
          <BestPost post={post} />
        </li>
      ))}
    </ul>
  );
}

function AllPosts({ posts }: PostsProps) {
  return (
    <ul className="flex w-full flex-col gap-6">
      {posts.map(post => (
        <li key={post.id}>
          <Post post={post} />
        </li>
      ))}
    </ul>
  );
}

interface PostProps {
  post: Post;
}

function BestPost({ post }: PostProps) {
  const {
    title,
    image,
    likeCount,
    createdAt,
    writer: { nickname },
  } = post;

  const formattedDate = formatDate(createdAt);

  return (
    <div className="rounded-lg bg-blue-secondary px-6 pb-4">
      <div className="mb-4 flex h-[30px] w-[102px] items-center justify-center gap-1 rounded-b-2xl bg-blue-primary text-base font-semibold text-white">
        <Icons.Medal className="w-4" />
        Best
      </div>
      <div className="mb-10 flex justify-between gap-10 xl:mb-[18x] xl:gap-5">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <div className="flex h-[72px] w-[72px] items-center justify-center rounded-lg border-[0.75px] border-solid border-gray-200 bg-white p-3">
          {renderImage(image)}
        </div>
      </div>
      <div className="flex justify-between text-sm font-normal">
        <div className="flex text-gray-500">
          <span className="mr-2 text-gray-600">{nickname}</span>
          <Icons.Heart className="mr-1 w-4" />
          <span>{likeCount}</span>
        </div>
        <span className="text-gray-400">{formattedDate}</span>
      </div>
    </div>
  );
}

function Post({ post }: PostProps) {
  const {
    title,
    image,
    likeCount,
    createdAt,
    writer: { nickname },
  } = post;

  const formattedDate = formatDate(createdAt);

  return (
    <div className="rounded-lg border-b border-solid border-gray-200 bg-gray-50 pb-6">
      <div className="mb-4 flex justify-between gap-2">
        <h3 className="text-lg font-semibold text-gray-800 md:text-xl">
          {title}
        </h3>
        <div className="flex h-[72px] w-[72px] items-center justify-center rounded-lg border-[0.75px] border-solid border-gray-100 bg-white p-3">
          {renderImage(image)}
        </div>
      </div>
      <div className="flex items-center justify-between font-normal">
        <div className="flex items-center gap-2 text-sm">
          <Image width={24} height={24} src={profileImg} alt="프로필 이미지" />
          <span className="text-gray-600">{nickname}</span>
          <span className="text-gray-400">{formattedDate}</span>
        </div>
        <div className="flex items-center gap-2 text-base text-gray-500">
          <Icons.Heart className="w-4" />
          <span>{likeCount}</span>
        </div>
      </div>
    </div>
  );
}

const renderImage = (image: string | null) => {
  return image ? (
    <div className="relative h-12 w-12">
      <Image
        className="object-cover"
        sizes="100%"
        fill
        src={image}
        alt="게시물 썸네일"
      />
    </div>
  ) : (
    <span>no image</span>
  );
};
