//Use react-query to fetch data from the server
import axios from '@/utils/axios';
import errorHandler from '@/utils/errorHandler';
import { useMutation, useQuery } from '@tanstack/react-query';
import { QueryClient } from '@tanstack/react-query';
import { useUserStore } from '../user';

const login = async (options: { email: string; password: string }) => {
  //call api
  const { data } = await axios.post(`/auth/login`, {
    email: options.email,
    password: options.password,
  });
  //get token
  const token = data.user.token;
  return token;
};

// Create a custom hook to fetch the user data
export const useLogin = () => {
  const { setToken } = useUserStore((state) => state);
  const query = useMutation(
    (data: any) =>
      login({
        email: data.email,
        password: data.password,
      }),
    {
      onSuccess: (token) => {
        //set token to local storage
        setToken(token);
      },
      onError: (error) => {
        console.log(error);
        errorHandler(error);
      },
    }
  );
  return query;
};
