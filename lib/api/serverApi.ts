import { cookies } from 'next/headers';
import { nextServer } from './api';

export const checkSession = async () => {
  const cookiesStore = await cookies();
  const response = await nextServer.get('users/current', {
    headers: {
      Cookie: cookiesStore.toString(),
    },
  });
  return response;
};
