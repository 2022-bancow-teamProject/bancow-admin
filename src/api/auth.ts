import axios, { AxiosPromise } from "axios";

interface IuserInfo {
  email: string;
  password1: string;
  password2: string;
}

interface signupSuccess {
  data: {
    data: {
      result: boolean;
      message: string;
    };
    status: string;
  };
}

// 회원 가입
export const axiosSignup = async (userInfo: IuserInfo) => {
  const data = await axios.post<AxiosPromise<signupSuccess>>(
    "register",
    userInfo
  );
  return data;
};

interface ISigninInfo {
  email: string;
  password: string;
}

// 로그인
export const axiosSignin = async (userInfo: ISigninInfo) => {
  const data = await axios.post<AxiosPromise<signupSuccess>>("login", userInfo);
  return data;
};
