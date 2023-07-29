//Use react-query to fetch data from the server
import axios from "@/utils/axios";
import errorHandler from "@/utils/errorHandler";
import { useMutation, useQuery } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";
import { useUserStore } from "../user";
import { message } from "antd";
import { useInterfaceStore } from "../interface";
import { useRouter } from "next/router";

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
const verifyEmail = async (options: { code: string }) => {
  console.log(options.code);

  //call api
  const { data } = await axios.get(`/auth/verifyEmail?verify=${options.code}`);
  //get token
  const user = data.user;
  console.log(data);

  return user;
};

export const useVerifyEmail = () => {
  const { setUser } = useUserStore((state) => state);
  const router = useRouter();

  const query = useMutation(
    (data: { code: string }) =>
      verifyEmail({
        code: data.code,
      }),
    {
      onSuccess: (user) => {
        setUser(user);
        message.success("Email verified successfully!");
      },
      onError: (error: any) => {
        if (error.response.data.message === "Invalid token.") {
          message.error("It looks like your verification link is invalid or has expired, please request a new one.");
          router.push("/resend-verification");
        }
      },
    }
  );
  return query;
};

const resendVerificationEmail = async (options: { email: String }) => {
  //call api
  const { data } = await axios.post("/auth/resend-verification-email", {
    email: options.email,
  });

  return data;
};

export const useResendVerificationEmail = () => {
  const { setDidSendEmail } = useInterfaceStore((state) => state);

  const query = useMutation(
    (data: { email: String }) =>
      resendVerificationEmail({
        email: data.email,
      }),
    {
      onError: (error) => {
        console.log(error);
        errorHandler(error);
      },
      onSuccess: (data) => {
        console.log(data);
        message.success(data.message);
        setDidSendEmail(true);
      },
    }
  );
  return query;
};

const sendPasswordForgotRequest = async (options: { username: String }) => {
  //call api
  const { data } = await axios.post("/auth/forgotpassword", {
    username: options.username,
  });

  return data;
};

export const useSendPasswordForgotRequest = () => {
  const { setDidSendEmail } = useInterfaceStore((state) => state);

  const query = useMutation(
    (data: { username: string }) =>
      sendPasswordForgotRequest({
        username: data.username,
      }),
    {
      onError: (error) => {
        console.log(error);
        errorHandler(error);
      },
      onSuccess: (data) => {
        console.log(data);
        message.success(data.message);
        setDidSendEmail(true);
      },
    }
  );
  return query;
};

export const useRegisterUser = () => {
  // get the signupUserForm data from state
  const { signUpUserFormValues } = useInterfaceStore((state) => state);
  const { setToken } = useUserStore((state) => state);
  const query = useMutation(() => registerUser(signUpUserFormValues), {
    onError: (error) => {
      console.log(error);
      errorHandler(error);
    },
    onSuccess: (data) => {
      console.log(data);
      setToken(data.user.token);
      message.success(data.message);
    },
  });

  return query;
};

export const registerUser = async (userForm: any) => {
  //call api
  const { data } = await axios.post("/auth/register", userForm);

  return data;
};
