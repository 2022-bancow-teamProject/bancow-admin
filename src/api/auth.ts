import axios from "axios";
const baseApi = process.env.REACT_APP_BASE_API;

interface IuserInfo {
  email: string;
  username: string;
  password: string;
  password2: string;
}

interface signupSuccess {
  data: {
    result: boolean;
    message: string;
  };
  status: string;
}

// 회원 가입
export const axiosSignup = async (userInfo: IuserInfo) => {
  try {
    const { data } = await axios.post<signupSuccess>(
      `${baseApi}register`,
      userInfo
    );
    return data.data.result;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.message);
    } else {
      throw new Error("different error than axios");
    }
  }
};

interface ISigninInfo {
  email: string;
  password: string;
}

interface signinSuccess {
  data: {
    token: string;
    message: string;
  };
  status: string;
}

// 로그인
export const axiosSignin = async (userInfo: ISigninInfo) => {
  try {
    const { data } = await axios.post<signinSuccess>(
      `${baseApi}login`,
      userInfo
    );
    return data.data.token;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.message);
    } else {
      throw new Error("different error than axios");
    }
  }
};
