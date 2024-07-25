import { useEffect, useState, useCallback, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { debounce } from 'lodash';
import axiosInstance from '@/lib/axios';
import formatDate from '@/lib/formatDate';
import BoardsLayout from '@/layouts/BoardsLayout';
import Dropdown from '@/components/Dropdown';
import Icons from '@/components/Icons';
import profileImg from '@/public/profile.svg';

export default function AddBoardPage() {
  return (
    <>
      <Head>
        <title>판다 마켓 | 게시글 등록</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="mx-auto max-w-[1200px] p-4 md:p-6">게시물 등록</main>
    </>
  );
}