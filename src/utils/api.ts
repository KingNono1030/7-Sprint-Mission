import { BASE_URL } from '@configs/env';

interface getItemsProps {
  pageSize: number;
  page?: number;
  order?: 'recent' | 'favorite';
  search?: string;
}

export async function getItems({
  page = 1,
  pageSize,
  order = 'recent',
  search = '',
}: getItemsProps) {
  const response = await fetch(
    `${BASE_URL}?page=${page}&pageSize=${pageSize}&orderBy=${order}&keyword=${search}`
  );
  if (!response.ok) {
    throw new Error('데이터를 불러오는데 실패했습니다');
  }
  const body = await response.json();
  return body;
}

export async function getItemByID(productId = '') {
  const response = await fetch(`${BASE_URL}/${productId}`);
  if (!response.ok) {
    throw new Error('데이터를 불러오는데 실패했습니다');
  }
  const body = await response.json();
  return body;
}

export async function getCommentsByID(productId = '', limit = 5, cursor = 0) {
  const response = await fetch(
    `${BASE_URL}/${productId}/comments?limit=${limit}&cursor=${cursor}`
  );
  if (!response.ok) {
    throw new Error('데이터를 불러오는데 실패했습니다');
  }
  const body = await response.json();
  return body;
}

// export async function submitItems(FormData) {
//   const response = await fetch(`${BASE_URL}`, {
//     method: 'POST',
//     body: FormData,
//   });
//   if (!response.ok) {
//     throw new Error('데이터를 전송하는데 실패했습니다');
//   }
//   const body = await response.json();
//   return body;
// }
