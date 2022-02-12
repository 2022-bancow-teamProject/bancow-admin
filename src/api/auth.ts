import axios from "axios";
const baseApi = process.env.REACT_APP_BASE_API;

interface IuserInfo {
  email: string;
  username: string;
  password: string;
  password2: string;
}

interface defaultResponse {
  data: {
    result: boolean;
    message: string;
  };
  status: string;
}

// 회원 가입
export const axiosSignup = async (userInfo: IuserInfo) => {
  try {
    const { data } = await axios.post<defaultResponse>(
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

// 로그아웃
export const axiosLogout = async () => {
  try {
    const token = sessionStorage.getItem("token");
    const { data } = await axios.post<defaultResponse>(
      `${baseApi}logout`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          TOKEN: `${token}`
        }
      }
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
