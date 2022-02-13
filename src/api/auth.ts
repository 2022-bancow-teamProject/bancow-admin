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
      return false;
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
      return false;
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
      return false;
    } else {
      throw new Error("different error than axios");
    }
  }
};

interface IAuth {
  email: string;
  username: string;
}

// 비밀번호 변경 인증
export const axiosMyAuth = async (userInfo: IAuth) => {
  try {
    const { data } = await axios.post<defaultResponse>(
      `${baseApi}findmanager`,
      userInfo
    );
    return data.data.result;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return false;
    } else {
      throw new Error("different error than axios");
    }
  }
};

interface IChangePassword {
  password1: string;
  password2: string;
}

// 비밀번호 변경
export const axiosChangePassword = async (userInfo: IChangePassword) => {
  try {
    const token = sessionStorage.getItem("token");
    const { data } = await axios.patch<defaultResponse>(
      `${baseApi}authentication/findmanager/${token}/change-password`,
      userInfo
    );
    return data.data.result;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return false;
    } else {
      throw new Error("different error than axios");
    }
  }
};

export interface Imanager {
  id: number;
  email: string;
  username: string;
  managerStatus: string;
  createDate: string;
  updateDate: string;
}

interface Iallmanager {
  data: {
    content: Imanager[];
    number: number; // page
    totalElements: number; // 계산 안된
    totalPages: number; // 계산된
  };
  status: string;
}

// 모든 메니저 정보 가져오기
export const axiosGetallmanager = async (page: number) => {
  try {
    const token = sessionStorage.getItem("token");
    const {
      data: { data }
    } = await axios.get<Iallmanager>(`${baseApi}allmanager?page=${page}`, {
      headers: {
        TOKEN: `${token}`
      }
    });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return false;
    } else {
      throw new Error("different error than axios");
    }
  }
};

// 권한 변경
export const axiosChangeAuthority = async (id: number) => {
  try {
    const token = sessionStorage.getItem("token");
    const { data } = await axios.patch<defaultResponse>(
      `${baseApi}statusadmin?id=${id}`,
      {},
      {
        headers: {
          TOKEN: `${token}`
        }
      }
    );
    return data.data.result;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return false;
    } else {
      throw new Error("different error than axios");
    }
  }
};
